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

// 1. Accept the new title prop here
const ZoomControls = ({ documentId, title }) => {
  const { provides: zoomProvides, state: zoomState } = useZoom(documentId);

  if (!zoomProvides) {
    return null;
  }

  return (
    <div className=" bg-gradient-to-r from-emb-blue to-emb-green-light text-white px-6 py-4 flex items-center justify-between rounded-t-2xl shadow-md z-10 relative">
      
      {/* Left side: Dynamic Title */}
      <div className="font-raleway font-bold text-sm tracking-widest text-white drop-shadow-md hidden md:block">
        {title}
      </div>

      {/* Right side: Zoom Pill */}
      <div className="font-raleway flex items-center gap-2 bg-white/20 drop-shadow-md rounded-full px-2 py-1 mx-auto md:mx-0">
        <button 
          onClick={zoomProvides.zoomOut} 
          className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition font-bold text-xl"
        >
          −
        </button>
        
        <span className="font-raleway text-xs font-bold w-12 text-center">
          {Math.round(zoomState.currentZoomLevel * 100)}%
        </span>
        
        <button 
          onClick={zoomProvides.zoomIn} 
          className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition font-bold text-xl"
        >
          +
        </button>

        {/* Reset Button */}
        <button 
          onClick={() => zoomProvides.requestZoom(1.0)} 
          className="ml-2 px-4 py-1.5 bg-[#8cc63f] hover:bg-[#7bc024] text-white font-merriweather font-bold rounded-full text-xs transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// 2. Add the title prop to the main component, with a default fallback
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

  if (isLoading || !engine) {
    return <div>Loading PDF Engine...</div>;
  }

  return (
    <div style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
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
                      style={{
                        backgroundColor: '#f1f3f5',
                        flex: 1, 
                        position: 'relative'
                      }}
                    >
                      <Scroller
                        documentId={activeDocumentId}
                        renderPage={({ width, height, pageIndex }) => (
                          <div style={{ width, height, margin: '10px auto', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
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