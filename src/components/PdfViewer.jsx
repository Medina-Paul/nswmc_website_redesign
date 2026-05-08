import React, { useMemo } from 'react';
import { createPluginRegistration } from '@embedpdf/core';
import { EmbedPDF } from '@embedpdf/core/react';
import { usePdfiumEngine } from '@embedpdf/engines/react';

// Import the essential plugins
import { Viewport, ViewportPluginPackage } from '@embedpdf/plugin-viewport/react';
import { Scroller, ScrollPluginPackage } from '@embedpdf/plugin-scroll/react';
import {
  DocumentContent,
  DocumentManagerPluginPackage,
} from '@embedpdf/plugin-document-manager/react';
import { RenderLayer, RenderPluginPackage } from '@embedpdf/plugin-render/react';
import { ZoomPluginPackage, ZoomMode, useZoom } from '@embedpdf/plugin-zoom/react';

// 1. Zoom Controls with Enhanced UI
const ZoomControls = ({ documentId, title }) => {
  const { provides: zoomProvides, state: zoomState } = useZoom(documentId);

  if (!zoomProvides) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#1a5b8c] to-[#35a4cc] dark:from-slate-800 dark:to-slate-900 text-white px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between shadow-md z-10 relative border-b border-white/10 dark:border-slate-700 transition-colors duration-500 gap-4 sm:gap-0">
      
      {/* Left side: Dynamic Title */}
      <div className="font-raleway font-bold text-sm md:text-base tracking-widest text-white drop-shadow-md text-center sm:text-left w-full sm:w-auto truncate">
        {title}
      </div>

      {/* Right side: Zoom Pill */}
      <div className="font-raleway flex items-center gap-1 md:gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm drop-shadow-md rounded-full px-2 md:px-3 py-1.5 w-full sm:w-auto justify-center transition-colors">
        <button 
          onClick={zoomProvides.zoomOut} 
          className="w-8 h-8 flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-all duration-300 active:scale-90 font-bold text-xl"
          aria-label="Zoom Out"
        >
          −
        </button>
        
        <span className="font-raleway text-xs md:text-sm font-bold w-12 md:w-16 text-center select-none">
          {Math.round(zoomState.currentZoomLevel * 100)}%
        </span>
        
        <button 
          onClick={zoomProvides.zoomIn} 
          className="w-8 h-8 flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-all duration-300 active:scale-90 font-bold text-xl"
          aria-label="Zoom In"
        >
          +
        </button>

        {/* Reset Button */}
        <button 
          onClick={() => zoomProvides.requestZoom(1.0)} 
          className="ml-2 px-4 py-1.5 bg-[#8cc63f] hover:bg-[#7ab133] text-white font-merriweather font-bold rounded-full text-[0.65rem] md:text-xs transition-all duration-300 active:scale-95 shadow-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// 2. Main Viewer Component
export const PDFViewer = ({ fileLink, title = "DOCUMENT VIEWER" }) => {
  const plugins = useMemo(() => [
    createPluginRegistration(DocumentManagerPluginPackage, {
      initialDocuments: [{ url: fileLink }],
    }),
    createPluginRegistration(ViewportPluginPackage),
    createPluginRegistration(ScrollPluginPackage),
    createPluginRegistration(RenderPluginPackage),
    createPluginRegistration(ZoomPluginPackage, {
      defaultZoomLevel: ZoomMode.FitWidth, 
    }),
  ], [fileLink]);

  const { engine, isLoading } = usePdfiumEngine();

  // Polished Loading State
  if (isLoading || !engine) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[500px] md:h-[700px] bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-gray-200 dark:border-slate-800 shadow-inner transition-colors duration-500">
        <div className="w-12 h-12 border-4 border-[#1a5b8c]/20 dark:border-blue-400/20 border-t-[#1a5b8c] dark:border-t-blue-400 rounded-full animate-spin"></div>
        <p className="mt-6 font-raleway font-bold text-[#1a5b8c] dark:text-blue-400 animate-pulse tracking-wide">Loading Document...</p>
      </div>
    );
  }

  return (
    // Outer Card Wrapper
    <div className="w-full h-[600px] md:h-[800px] flex flex-col rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
      <EmbedPDF engine={engine} plugins={plugins}>
        {({ activeDocumentId }) =>
          activeDocumentId && (
            <>
              {/* 3. Pass the title down to the ZoomControls */}
              <ZoomControls documentId={activeDocumentId} title={title} />
              
              <DocumentContent documentId={activeDocumentId}>
                {({ isLoaded }) =>
                  isLoaded && (
                    <Viewport
                      documentId={activeDocumentId}
                      // Blending mandatory inline styles with Tailwind classes for scrollbar styling
                      className="[&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1a5b8c]/30 dark:[&::-webkit-scrollbar-thumb]:bg-blue-400/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#1a5b8c]/60 dark:hover:[&::-webkit-scrollbar-thumb]:bg-blue-400/60 transition-colors duration-500"
                      style={{
                        flex: 1, 
                        position: 'relative',
                        backgroundColor: 'transparent', // Let parent handle background
                      }}
                    >
                      <Scroller
                        documentId={activeDocumentId}
                        renderPage={({ width, height, pageIndex }) => (
                          // Individual Page Container
                          <div 
                            style={{ width, height }}
                            className="mx-auto my-6 md:my-10 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-shadow duration-300"
                          >
                            <RenderLayer
                              documentId={activeDocumentId}
                              pageIndex={pageIndex}
                            />
                          </div>
                        )}
                      />
                    </Viewport>
                  )
                }
              </DocumentContent>
            </>
          )
        }
      </EmbedPDF>
    </div>
  );
};