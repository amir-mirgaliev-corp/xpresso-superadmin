/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,html,js}", "./index.html"],
   darkMode: 'media', // or 'media' or 'class'
   fontFamily: {
    
   },
   theme: {
     extend: {
      width: {
        mainContent: 'calc(100% - 82px)',
        content: 'calc((100% / 3) - 20px)',
        chartContent: 'calc((100% / 2) - 20px)',
        transportContent: 'calc((100%) - 120px)'
      },
      height: {
        section: 'calc(100vh - 64px)'
      },
      fontSize: {
        s: '10px',
        l: '12px',
        m: '14px',
        default: '16px',
        large: '24px'
      },
      colors: {
        green: {
          bg: '#19664D',
        },
        dark: {
          orange: {
            bg: '#F6350D',
          },
          blue: { 
            text: '#1B2559'
          }
        },
        gray: {
          text: '#747474'
        },
        orange: '#F8AE00'
       },
       boxShadow: {
        drop: "0px 6px 8px -4px rgba(16, 24, 40, 0.02), 0px 12px 16px -2px rgba(16, 24, 40, 0.06)",
        order: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        form: '0px 1px 2px 0px rgba(16, 24, 40, 0.05);'
       }
     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }

