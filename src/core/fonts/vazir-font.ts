import localFont from "next/font/local"

// local font
export const vazirFont = localFont({
  src: [
    {
      path: '../../../public/fonts/Vazirmatn-Black.ttf',
      style: 'normal',
      weight: '900'
    },
    {
      path: '../../../public/fonts/Vazirmatn-Bold.ttf',
      style: 'normal',
      weight: '800'
    },
    {
      path: '../../../public/fonts/Vazirmatn-ExtraBold.ttf',
      style: 'normal',
      weight: '700'
    },
    {
      path: '../../../public/fonts/Vazirmatn-ExtraLight.ttf',
      style: 'normal',
      weight: '600'
    },
    {
      path: '../../../public/fonts/Vazirmatn-Light.ttf',
      style: 'normal',
      weight: '500'
    },
    {
      path: '../../../public/fonts/Vazirmatn-Medium.ttf',
      style: 'normal',
      weight: '400'
    },
    {
      path: '../../../public/fonts/Vazirmatn-Regular.ttf',
      style: 'normal',
      weight: '300'
    },
    {
      path: '../../../public/fonts/Vazirmatn-SemiBold.ttf',
      style: 'normal',
      weight: "200"
    },
    {
      path: '../../../public/fonts/Vazirmatn-Thin.ttf',
      style: 'normal',
      weight: "100"
    },
  ]
})