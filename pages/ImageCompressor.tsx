
import React, { useState, useRef, useEffect } from 'react';

const ImageCompressor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Image Compressor - Free Online Tools Hub";
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        compress(event.target?.result as string, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compress = (imgSrc: string, q: number) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', q);
      setCompressedImage(compressedDataUrl);
      
      // Calculate compressed size from base64 string
      const stringLength = compressedDataUrl.split(',')[1].length;
      const sizeInBytes = Math.floor(stringLength * (3 / 4));
      setCompressedSize(sizeInBytes);
      setIsProcessing(false);
    };
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const reduction = originalSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Image Compressor</h1>
        <p className="text-slate-600 dark:text-slate-400">Optimize your images for the web instantly.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
          ref={fileInputRef} 
        />
        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center mb-4">
          <i className="fas fa-cloud-arrow-up text-3xl"></i>
        </div>
        <h3 className="text-xl font-bold mb-2 dark:text-white">Upload your image</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xs">Supports PNG, JPG, and WEBP. High quality compression.</p>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all active:scale-95"
        >
          Select Image
        </button>
      </div>

      {originalImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Original</h4>
            <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <img src={originalImage} alt="Original" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Size:</span>
              <span className="font-mono font-bold">{formatSize(originalSize)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-primary-600 uppercase text-xs tracking-widest">Compressed</h4>
            <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              {isProcessing ? (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <span className="text-xs text-slate-400">Compressing...</span>
                </div>
              ) : (
                <img src={compressedImage || ''} alt="Compressed" className="max-h-full max-w-full object-contain" />
              )}
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-500">Size:</span>
                <span className="font-mono font-bold">{formatSize(compressedSize)}</span>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 px-2 py-1 rounded text-xs font-bold">
                -{reduction}% Saved
              </div>
            </div>
          </div>

          <div className="md:col-span-2 pt-6 border-t border-slate-100 dark:border-slate-700 space-y-4">
             <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Compression Quality: {Math.round(quality * 100)}%</label>
             </div>
             <input 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.05" 
              value={quality}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setQuality(val);
                compress(originalImage!, val);
              }}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
             />
             <div className="flex justify-center pt-4">
                <a 
                  href={compressedImage || '#'} 
                  download="compressed-image.jpg"
                  className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition-all flex items-center space-x-2"
                >
                  <i className="fas fa-download"></i>
                  <span>Download Compressed Image</span>
                </a>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
