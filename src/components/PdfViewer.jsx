import React, { useEffect, useRef, useState, useId } from 'react';

// Adobe Embed API client ID (provided by NSWMC)
const ADOBE_CLIENT_ID = '5b4f7d150d9445a9a472ed3adfa9714e';
const ADOBE_VIEW_SDK_URL = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';

/**
 * Loads the Adobe View SDK script exactly once and resolves when
 * window.AdobeDC is ready to use.
 */
const loadAdobeViewSDK = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));

  if (window.AdobeDC) return Promise.resolve(window.AdobeDC);

  // If the script tag is already on the page, just wait for the ready event.
  const existing = document.querySelector(`script[src="${ADOBE_VIEW_SDK_URL}"]`);
  if (!existing) {
    const script = document.createElement('script');
    script.src = ADOBE_VIEW_SDK_URL;
    script.async = true;
    document.head.appendChild(script);
  }

  return new Promise((resolve, reject) => {
    if (window.AdobeDC) return resolve(window.AdobeDC);
    const onReady = () => resolve(window.AdobeDC);
    document.addEventListener('adobe_dc_view_sdk.ready', onReady, { once: true });

    // Safety timeout so the loading spinner doesn't spin forever.
    setTimeout(() => {
      if (window.AdobeDC) resolve(window.AdobeDC);
      else reject(new Error('Adobe View SDK failed to load'));
    }, 15000);
  });
};

/**
 * PDFViewer — same public API as the previous embedpdf-based viewer:
 *   <PDFViewer fileLink={pdfUrl} title="DOCUMENT TITLE" />
 *
 * Keeps the original blue gradient header ("blue shape thingy") and the
 * same outer card sizing (h-[600px] md:h-[800px], rounded-[2rem], shadow-2xl)
 * so it drops into CitizenCharter.jsx without further changes.
 */
export const PDFViewer = ({ fileLink, title = 'DOCUMENT VIEWER' }) => {
  const containerRef = useRef(null);
  const reactId = useId();
  // Adobe expects a stable plain string DOM id (no colons from useId)
  const divId = `adobe-dc-view-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    loadAdobeViewSDK()
      .then((AdobeDC) => {
        if (cancelled || !containerRef.current) return;
        // Clear any previous render (e.g. when fileLink changes)
        containerRef.current.innerHTML = '';

        const adobeDCView = new AdobeDC.View({
          clientId: ADOBE_CLIENT_ID,
          divId,
        });

        const fileName = (() => {
          try {
            const segs = String(fileLink).split('/');
            return decodeURIComponent(segs[segs.length - 1]) || 'document.pdf';
          } catch {
            return 'document.pdf';
          }
        })();

        adobeDCView.previewFile(
          {
            content: { location: { url: fileLink } },
            metaData: { fileName },
          },
          {
            embedMode: 'SIZED_CONTAINER', // fills our fixed-height card
            defaultViewMode: 'FIT_WIDTH',
            showAnnotationTools: false,
            showLeftHandPanel: false,
            showDownloadPDF: true,
            showPrintPDF: true,
            showFullScreen: true,
          }
        );

        setIsLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Adobe Embed load error:', err);
        setError(err.message || 'Failed to load PDF viewer');
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fileLink, divId]);

  return (
    // Outer Card Wrapper — matches the original size & shape
    <div className="w-full h-[600px] md:h-[800px] flex flex-col rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Blue gradient header — preserved from the original viewer */}
      <div className="bg-gradient-to-r from-[#1a5b8c] to-[#35a4cc] dark:from-slate-800 dark:to-slate-900 text-white px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between shadow-md z-10 relative border-b border-white/10 dark:border-slate-700 transition-colors duration-500 gap-4 sm:gap-0">
        <div className="font-raleway font-bold text-sm md:text-base tracking-widest text-white drop-shadow-md text-center sm:text-left w-full sm:w-auto truncate">
          {title}
        </div>
        <div className="font-raleway flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm drop-shadow-md rounded-full px-3 py-1.5">
          <span className="text-[0.65rem] md:text-xs font-bold tracking-wider uppercase">
            Powered by Adobe
          </span>
        </div>
      </div>

      {/* Viewer surface */}
      <div className="relative flex-1 bg-slate-50 dark:bg-slate-900">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 z-10">
            <div className="w-12 h-12 border-4 border-[#1a5b8c]/20 dark:border-blue-400/20 border-t-[#1a5b8c] dark:border-t-blue-400 rounded-full animate-spin"></div>
            <p className="mt-6 font-raleway font-bold text-[#1a5b8c] dark:text-blue-400 animate-pulse tracking-wide">
              Loading Document...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
            <p className="font-raleway font-bold text-red-600 dark:text-red-400">
              Could not load the PDF.
            </p>
            <p className="mt-2 font-merriweather text-xs text-gray-600 dark:text-gray-400">
              {error}
            </p>
            <a
              href={fileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-[#1a5b8c] hover:bg-[#15486f] text-white font-raleway font-bold rounded-full text-xs transition-colors"
            >
              Open PDF in new tab
            </a>
          </div>
        )}

        {/* Adobe injects the viewer iframe into this div */}
        <div ref={containerRef} id={divId} className="w-full h-full" />
      </div>
    </div>
  );
};

export default PDFViewer;
