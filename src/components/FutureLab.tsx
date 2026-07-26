"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, UserCheck, ShieldCheck, Heart, Cpu, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FutureLabProps {
  productImage: string;
  productTitle: string;
}

export default function FutureLab({ productImage, productTitle }: FutureLabProps) {
  const [activeTab, setActiveTab] = useState<'mirror' | 'lidar' | 'sensors' | 'nft'>('mirror');
  
  // Smart Mirror states
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isMirrorActive, setIsMirrorActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // LiDAR states
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ chest: number; waist: number; size: string } | null>(null);

  // Sensor states
  const [isTrackingSensors, setIsTrackingSensors] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [ventilation, setVentilation] = useState(94);
  const [temp, setTemp] = useState(36.8);

  // NFT states
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Activate WebRTC camera stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setCameraStream(stream);
      setIsMirrorActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 300);
    } catch (err) {
      console.error(err);
      setCameraError("Camera access denied or unavailable. Running in simulation mode.");
      setIsMirrorActive(true);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsMirrorActive(false);
  };

  // Run LiDAR Scanner Simulation
  const runLiDARScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        chest: Math.floor(96 + Math.random() * 12),
        waist: Math.floor(80 + Math.random() * 10),
        size: Math.random() > 0.5 ? "M" : "L"
      });
    }, 3000);
  };

  // Start Smart Sensor biometrics simulator
  const toggleSensors = () => {
    if (!isTrackingSensors) {
      setIsTrackingSensors(true);
      const interval = setInterval(() => {
        setHeartRate(Math.floor(65 + Math.random() * 45));
        setVentilation(Math.floor(88 + Math.random() * 10));
        setTemp(parseFloat((36.5 + Math.random() * 0.9).toFixed(1)));
      }, 1500);
      (window as any).sensorSimInterval = interval;
    } else {
      setIsTrackingSensors(false);
      clearInterval((window as any).sensorSimInterval);
    }
  };

  // Claim NFT
  const handleMintNFT = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setIsMinted(true);
    }, 2500);
  };

  return (
    <div className="w-full bg-[#EBE9E3] text-black border border-black/10 rounded-lg p-6 mt-12 select-none text-left shadow-sm">
      <div className="flex items-center space-x-2.5 mb-6">
        <Sparkles className="w-5 h-5 text-[#FF8500] animate-pulse" />
        <h3 className="text-sm font-black tracking-widest uppercase">NEBULA FUTURISTIC LAB</h3>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap border-b border-black/10 mb-6 gap-2">
        {[
          { id: 'mirror', label: 'AI Smart Mirror', icon: Camera },
          { id: 'lidar', label: 'Biometric LiDAR', icon: UserCheck },
          { id: 'sensors', label: 'Fabric Sensors', icon: Cpu },
          { id: 'nft', label: 'Digital Twin NFT', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                stopCamera();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center space-x-2 py-3 px-4 text-[10px] font-black tracking-widest uppercase border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#FF8500] text-black'
                  : 'border-transparent text-black/50 hover:text-black'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[350px] relative bg-white/40 border border-black/5 p-6 rounded-md">
        <AnimatePresence mode="wait">
          
          {/* AI Smart Mirror Tab */}
          {activeTab === 'mirror' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <h4 className="text-xs font-black tracking-wider uppercase">Virtual WebRTC Smart Fitting Mirror</h4>
              <p className="text-[11px] text-black/60 max-w-md leading-relaxed font-semibold">
                Activate your camera feed to scan your viewport and overlay the **{productTitle}** virtual garment directly on your body.
              </p>

              {!isMirrorActive ? (
                <button
                  onClick={startCamera}
                  className="py-3 px-6 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  ACTIVATE SMART MIRROR
                </button>
              ) : (
                <div className="flex flex-col items-center space-y-4 w-full max-w-[500px]">
                  {/* Camera Viewer Panel */}
                  <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden border border-black/10 shadow-lg flex items-center justify-center">
                    {cameraStream ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform -scale-x-100"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center text-white p-4">
                        <Camera className="w-8 h-8 text-white/30 mb-2 animate-pulse" />
                        <span className="text-[10px] font-black tracking-wider text-white/50 uppercase">CAMERA FEED SIMULATION</span>
                        <p className="text-[9px] text-white/40 mt-1 max-w-[280px]">{cameraError}</p>
                      </div>
                    )}

                    {/* Overlay Garment */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                      <motion.div
                        className="relative w-40 h-40 opacity-75 mt-8"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        <Image
                          src={productImage}
                          alt="Garment Overlay"
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <button
                    onClick={stopCamera}
                    className="py-2.5 px-6 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    DEACTIVATE CAMERA
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Biometric LiDAR Tab */}
          {activeTab === 'lidar' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <h4 className="text-xs font-black tracking-wider uppercase">Interactive LiDAR Body Blueprint Scan</h4>
              <p className="text-[11px] text-black/60 max-w-md leading-relaxed font-semibold">
                Simulates real-time biometric scanning grids to accurately determine chest, waist, and fit measurements.
              </p>

              {!isScanning && !scanResult && (
                <button
                  onClick={runLiDARScan}
                  className="py-3 px-6 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  START BIOMETRIC SCAN
                </button>
              )}

              {isScanning && (
                <div className="flex flex-col items-center space-y-3">
                  {/* Glowing Laser Scan Ring Animation */}
                  <div className="relative w-24 h-24 rounded-full border-4 border-dashed border-[#FF8500] flex items-center justify-center animate-spin">
                    <UserCheck className="w-8 h-8 text-[#FF8500] animate-pulse" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-[#FF8500] animate-pulse">
                    ANALYZING BODY COORDINATES...
                  </span>
                </div>
              )}

              {scanResult && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/80 border border-black/10 rounded-md p-6 max-w-sm w-full text-left space-y-4 shadow-sm"
                >
                  <div className="border-b border-black/5 pb-2">
                    <h5 className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">BIOMETRIC SCORECARD</h5>
                  </div>
                  <div className="space-y-2 text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-black/60">CHEST WIDTH:</span>
                      <span>{scanResult.chest} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">WAIST LINE:</span>
                      <span>{scanResult.waist} cm</span>
                    </div>
                    <div className="flex justify-between border-t border-black/5 pt-2">
                      <span className="text-[#FF8500] font-black">MATCHED FIT:</span>
                      <span className="font-black text-[#FF8500]">NEBULA SIZE {scanResult.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={runLiDARScan}
                    className="w-full py-2 bg-black/5 hover:bg-black/10 text-black text-[9px] font-black tracking-widest uppercase rounded-sm transition-colors flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>SCAN AGAIN</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Fabric Sensors Tab */}
          {activeTab === 'sensors' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <h4 className="text-xs font-black tracking-wider uppercase">Smart Fiber Sensor Dashboard</h4>
              <p className="text-[11px] text-black/60 max-w-md leading-relaxed font-semibold">
                Simulate active feedback logs from the biometric micro-sensors woven into the **{productTitle}** mesh fabric.
              </p>

              {!isTrackingSensors ? (
                <button
                  onClick={toggleSensors}
                  className="py-3 px-6 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  ACTIVATE FABRIC SENSORS
                </button>
              ) : (
                <div className="w-full max-w-md space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 bg-white/70 border border-black/5 rounded-md text-left">
                      <Heart className="w-4 h-4 text-red-500 animate-pulse mb-2" />
                      <span className="text-[9px] text-black/45 tracking-wider uppercase font-black">HEART RATE</span>
                      <div className="text-base font-black mt-0.5">{heartRate} BPM</div>
                    </div>
                    <div className="p-4 bg-white/70 border border-black/5 rounded-md text-left">
                      <Cpu className="w-4 h-4 text-blue-500 mb-2" />
                      <span className="text-[9px] text-black/45 tracking-wider uppercase font-black">AIR FLUX</span>
                      <div className="text-base font-black mt-0.5">{ventilation}%</div>
                    </div>
                    <div className="p-4 bg-white/70 border border-black/5 rounded-md text-left">
                      <Sparkles className="w-4 h-4 text-orange-500 mb-2" />
                      <span className="text-[9px] text-black/45 tracking-wider uppercase font-black">FABRIC TEMP</span>
                      <div className="text-base font-black mt-0.5">{temp}°C</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-700 text-[10px] font-black tracking-widest uppercase text-center rounded-sm">
                    ● FIBER NETWORK HEALTH: SECURE & TRANSMITTING
                  </div>

                  <button
                    onClick={toggleSensors}
                    className="py-2.5 px-6 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    DISABLE SENSORS
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Digital Twin NFT Tab */}
          {activeTab === 'nft' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <h4 className="text-xs font-black tracking-wider uppercase">Metadata Digital Twin NFT Minting</h4>
              <p className="text-[11px] text-black/60 max-w-md leading-relaxed font-semibold">
                Claim a secure 3D digital duplicate (NFT) of the **{productTitle}** for metaverse integrations.
              </p>

              {!walletConnected && (
                <button
                  onClick={() => setWalletConnected(true)}
                  className="py-3 px-6 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  CONNECT WEB3 WALLET (SOL/ETH)
                </button>
              )}

              {walletConnected && !isMinting && !isMinted && (
                <div className="space-y-4 flex flex-col items-center">
                  <div className="text-[10px] font-black text-green-600 uppercase">
                    ● WALLET CONNECTED: 0xNEBULA...8A2B
                  </div>
                  <button
                    onClick={handleMintNFT}
                    className="py-3 px-6 bg-brand-orange text-white text-[10px] font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    MINT DIGITAL TWIN NFT
                  </button>
                </div>
              )}

              {isMinting && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-10 h-10 border-4 border-black/10 border-t-[#FF8500] rounded-full animate-spin" />
                  <span className="text-[10px] font-black tracking-widest uppercase animate-pulse">
                    MINTING METADATA BLOCK...
                  </span>
                </div>
              )}

              {isMinted && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/80 border border-black/10 rounded-md p-6 max-w-sm w-full text-left space-y-4 shadow-sm"
                >
                  <div className="border-b border-black/5 pb-2 text-center">
                    <span className="text-[10px] font-black tracking-widest text-green-600 uppercase">MINTING COMPLETE</span>
                  </div>
                  <div className="relative aspect-square w-32 mx-auto rounded overflow-hidden border border-black/5">
                    <Image
                      src={productImage}
                      alt="Digital Twin NFT"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#FF8500]/10 flex items-center justify-center">
                      <span className="bg-black text-white text-[8px] font-black tracking-wider px-2 py-0.5 rounded">TWIN NFT</span>
                    </div>
                  </div>
                  <div className="text-[9px] font-semibold text-black/50 text-center tracking-wide mt-2">
                    TOKEN ID: #NEBULA-{Math.floor(1000 + Math.random() * 9000)}<br />
                    MAPPED CONTRACT: Solana Edge ERC-721
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
