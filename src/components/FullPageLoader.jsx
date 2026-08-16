import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FullPageLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 pointer-events-auto"
        >
          <div className="relative flex items-center justify-center">
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full animate-pulse-slow" />

            {/* SVG Logo */}
            <svg
              className="w-36 md:w-48 relative z-10 overflow-visible"
              viewBox="0 0 285 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Blue Gradient for 'A' Path */}
                <linearGradient id="logo-gradient-a" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>

                {/* Red Gradient for 'B' Path */}
                <linearGradient id="logo-gradient-b" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              {/* Path for 'B' (Red Animation) */}
              <path
                d="M137.93 104.865H154.356C154.356 112.722 154.467 120.002 154.307 127.282C154.209 131.633 155.903 133.263 160.372 133.239C189.247 133.092 218.121 133.288 246.983 133.104C259.309 133.018 267.584 124.843 267.387 113.763C267.191 103.002 259.947 96.3717 247.168 96.3104C190.167 96.0408 133.167 95.9795 76.1667 95.8447C72.7784 95.8447 69.39 95.8447 65.4492 95.8447V78.931C68.101 78.931 70.9123 78.931 73.7359 78.931C130.012 78.931 186.288 78.9433 242.564 78.9678C262.513 78.9678 273.685 64.9589 269.13 45.5817C266.761 35.5315 257.787 28.092 245.878 27.8223C223.621 27.3198 201.351 27.4669 179.094 27.4056C166.318 27.3729 155.727 21.8494 147.322 10.8351C150.71 10.688 153.534 10.4307 156.357 10.4674C186.19 10.7738 216.034 11.2886 245.866 11.4112C264.158 11.4969 276.472 20.2357 283.506 36.561C290.222 52.151 286.146 71.5282 274.311 83.3555C273.292 84.3728 272.335 85.4514 271.181 86.6893C272.015 87.8536 272.58 88.9321 273.415 89.7411C284.28 100.22 287.103 112.807 281.579 126.534C275.821 140.85 264.207 148.277 248.935 148.436C213.947 148.816 178.959 148.633 143.97 148.375C141.957 148.363 138.286 145.716 138.225 144.196C137.758 131.302 137.955 118.396 137.955 104.89L137.93 104.865Z"
                className="animate-logo-draw-red"
                style={{ animationDelay: '0.2s' }}
              />

              {/* Path for 'A' (Blue Animation) */}
              <path
                d="M155.656 71.0991H137.253C137.253 65.1058 137.302 59.3576 137.253 53.6094C137.106 38.044 127.346 27.957 111.681 27.81C88.4658 27.5893 65.2385 27.5893 42.0234 27.81C28.1263 27.9448 17.8508 36.8061 17.4457 50.6557C16.66 77.4724 17.0651 104.326 16.9792 131.155C16.9669 136.732 16.9792 142.296 16.9792 148.449H0.368907C0.270694 146.451 0.0497149 144.147 0.0497149 141.83C0.0251617 112.783 0.147928 83.7476 0.000608452 54.7002C-0.109881 33.5949 14.8308 10.4428 42.2076 11.1659C66.1101 11.8033 90.0495 11.0801 113.964 11.3988C134.871 11.6807 148.535 22.4907 153.029 42.8729C154.993 51.7587 154.796 61.1103 155.656 71.0991Z"
                className="animate-logo-draw-blue"
                style={{ animationDelay: '0s' }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};