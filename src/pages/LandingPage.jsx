import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../App.css'
import Footer from '../components/Footer';

// Reusable Logo Component
const LogoSVG = () => (
    <svg className="w-36 md:w-48" viewBox="0 0 658 160" xmlns="http://www.w3.org/2000/svg">
        <path d="M137.93 104.865H154.356C154.356 112.722 154.467 120.002 154.307 127.282C154.209 131.633 155.903 133.263 160.372 133.239C189.247 133.092 218.121 133.288 246.983 133.104C259.309 133.018 267.584 124.843 267.387 113.763C267.191 103.002 259.947 96.3717 247.168 96.3104C190.167 96.0408 133.167 95.9795 76.1667 95.8447C72.7784 95.8447 69.39 95.8447 65.4492 95.8447V78.931C68.101 78.931 70.9123 78.931 73.7359 78.931C130.012 78.931 186.288 78.9433 242.564 78.9678C262.513 78.9678 273.685 64.9589 269.13 45.5817C266.761 35.5315 257.787 28.092 245.878 27.8223C223.621 27.3198 201.351 27.4669 179.094 27.4056C166.318 27.3729 155.727 21.8494 147.322 10.8351C150.71 10.688 153.534 10.4307 156.357 10.4674C186.19 10.7738 216.034 11.2886 245.866 11.4112C264.158 11.4969 276.472 20.2357 283.506 36.561C290.222 52.151 286.146 71.5282 274.311 83.3555C273.292 84.3728 272.335 85.4514 271.181 86.6893C272.015 87.8536 272.58 88.9321 273.415 89.7411C284.28 100.22 287.103 112.807 281.579 126.534C275.821 140.85 264.207 148.277 248.935 148.436C213.947 148.816 178.959 148.633 143.97 148.375C141.957 148.363 138.286 145.716 138.225 144.196C137.758 131.302 137.955 118.396 137.955 104.89L137.93 104.865Z" fill="red" />
        <path d="M155.656 71.0991H137.253C137.253 65.1058 137.302 59.3576 137.253 53.6094C137.106 38.044 127.346 27.957 111.681 27.81C88.4658 27.5893 65.2385 27.5893 42.0234 27.81C28.1263 27.9448 17.8508 36.8061 17.4457 50.6557C16.66 77.4724 17.0651 104.326 16.9792 131.155C16.9669 136.732 16.9792 142.296 16.9792 148.449H0.368907C0.270694 146.451 0.0497149 144.147 0.0497149 141.83C0.0251617 112.783 0.147928 83.7476 0.000608452 54.7002C-0.109881 33.5949 14.8308 10.4428 42.2076 11.1659C66.1101 11.8033 90.0495 11.0801 113.964 11.3988C134.871 11.6807 148.535 22.4907 153.029 42.8729C154.993 51.7587 154.796 61.1103 155.656 71.0991Z" fill="white" />
        <path d="M310.281 0H308.648C308.56 0 308.488 0.0713352 308.488 0.159332V159.626C308.488 159.714 308.56 159.785 308.648 159.785H310.281C310.369 159.785 310.44 159.714 310.44 159.626V0.159332C310.44 0.0713352 310.369 0 310.281 0Z" fill="white" />
        <path d="M582.014 17.8331V61.3774C582.014 62.4452 582.188 63.2026 582.524 63.662C582.859 64.1214 583.531 64.469 584.513 64.7298V65.9838H573.382V64.7298C574.365 64.469 575.036 64.1214 575.372 63.6744C575.708 63.2398 575.882 62.47 575.882 61.3774V17.8331H557.836C556.742 17.8331 555.971 17.9945 555.51 18.3297C555.05 18.665 554.714 19.323 554.478 20.3288H553.234V10.2715H554.478C554.714 11.2648 555.063 11.9353 555.51 12.2705C555.958 12.6058 556.742 12.7672 557.836 12.7672H600.047C601.142 12.7672 601.913 12.6058 602.373 12.2705C602.833 11.9353 603.169 11.2772 603.405 10.2715H604.649V20.3288H603.405C603.169 19.323 602.821 18.665 602.373 18.3297C601.913 17.9945 601.142 17.8331 600.047 17.8331H582.001H582.014Z" fill="white" />
        <path d="M375.143 49.9137H347.043L342.431 59.72C341.995 60.6539 341.777 61.3101 341.777 61.6888C341.777 62.446 342.533 62.9508 344.045 63.2032V64.4148H332.359V63.2032C333.41 63.0265 334.205 62.6479 334.743 62.0674C335.306 61.4868 336.037 60.2248 336.934 58.2812L356.154 17.4283C356.615 16.4439 356.846 15.775 356.846 15.4216C356.846 14.7653 356.218 14.2731 354.962 13.945V12.7334H367.724V13.945C366.468 14.3488 365.841 14.8789 365.841 15.5352C365.841 15.8128 366.071 16.4439 366.532 17.4283L384.945 56.8046C386.303 59.7073 387.2 61.4111 387.636 61.916C388.072 62.4208 389.02 62.8499 390.48 63.2032V64.4148H378.026V63.2032C379.512 63.0013 380.255 62.446 380.255 61.5373C380.255 61.1335 379.974 60.351 379.41 59.1899L375.143 49.9137ZM372.875 44.9917L361.074 19.4728L349.311 44.9917H372.875Z" fill="white" stroke="white" strokeWidth="0.1" strokeMiterlimit="10" />
        <path d="M510.55 40.2959V59.4919H544.185C545.261 59.4919 546.017 59.3278 546.453 58.9997C546.914 58.6716 547.26 58.0279 547.491 57.0687H548.721V66.8371H547.529C547.273 65.8779 546.914 65.2343 546.453 64.9061C546.017 64.578 545.261 64.4139 544.185 64.4139H502.055V63.2024C503.054 62.9499 503.708 62.6092 504.015 62.1801C504.348 61.751 504.515 61.0064 504.515 59.9462V17.2002C504.515 16.1401 504.348 15.3955 504.015 14.9664C503.682 14.5373 503.028 14.1965 502.055 13.9441V12.7325H543.685C544.761 12.7325 545.517 12.5684 545.953 12.2403C546.389 11.9122 546.735 11.2559 546.991 10.2715H548.221V20.0398H546.991C546.76 19.1059 546.414 18.4749 545.953 18.1468C545.517 17.8186 544.761 17.6546 543.685 17.6546H510.55V35.3739H532.268C533.345 35.3739 534.101 35.2098 534.536 34.8817C534.998 34.5536 535.344 33.9099 535.574 32.9507H536.804V42.7191H535.574C535.344 41.7599 534.998 41.1163 534.536 40.7881C534.101 40.46 533.345 40.2959 532.268 40.2959H510.55Z" fill="white" stroke="white" strokeWidth="0.1" strokeMiterlimit="10" />
        <path d="M497.344 16.1379L491.847 25.9063L490.77 25.3383C491.206 24.2025 491.424 23.4957 491.424 23.2181C491.424 22.4608 490.476 21.6405 488.579 20.7571C483.428 18.3844 477.97 17.198 472.204 17.198C467.463 17.198 463.337 18.0689 459.826 19.8105C458.135 20.6687 456.79 21.7793 455.79 23.1423C454.816 24.5054 454.329 25.9441 454.329 27.4586C454.329 28.7207 454.714 29.9196 455.483 31.0555C456.251 32.1661 457.264 32.9991 458.519 33.5544C459.903 34.1854 461.531 34.6271 463.401 34.8795C465.298 35.1067 468.373 35.2834 472.627 35.4096C478.521 35.5863 482.736 35.8639 485.273 36.2426C487.811 36.5959 489.899 37.227 491.539 38.1357C495.896 40.5336 498.074 44.1809 498.074 49.0777C498.074 53.7473 496.101 57.5714 492.154 60.5499C487.772 63.8817 481.737 65.5476 474.049 65.5476C469.616 65.5476 465.746 65.1059 462.44 64.2225C459.134 63.339 455.188 61.711 450.601 59.3383C449.319 58.7577 448.563 58.4675 448.333 58.4675C447.948 58.4675 447.346 58.9218 446.526 59.8305L445.488 59.1868L451.254 49.6835L452.331 50.2893C451.844 51.299 451.6 51.9805 451.6 52.3339C451.6 53.1416 453.24 54.391 456.521 56.0822C459.468 57.5967 462.299 58.6946 465.016 59.3761C467.758 60.0324 470.73 60.3606 473.934 60.3606C480.417 60.3606 485.338 58.9597 488.695 56.1579C490.924 54.29 492.039 52.0688 492.039 49.4942C492.039 46.1119 490.13 43.7771 486.311 42.4898C485.081 42.0607 483.8 41.7956 482.467 41.6947C481.16 41.5685 477.419 41.3918 471.243 41.1646C466.835 40.9879 463.376 40.6598 460.864 40.1802C458.378 39.7006 456.162 38.9181 454.214 37.8328C452.395 36.8231 450.947 35.4096 449.87 33.5922C448.82 31.7748 448.294 29.7934 448.294 27.6479C448.294 23.9879 449.678 20.8454 452.446 18.2203C454.496 16.302 457.328 14.8001 460.941 13.7148C464.554 12.6041 468.514 12.0488 472.819 12.0488C476.33 12.0488 479.584 12.3896 482.583 13.0711C485.607 13.7526 489.015 14.9263 492.808 16.5923C493.653 16.9456 494.179 17.1223 494.384 17.1223C494.845 17.1223 495.473 16.6175 496.267 15.6078L497.344 16.1379Z" fill="white" stroke="white" strokeWidth="0.1" strokeMiterlimit="10" />
        <path d="M656.269 17.0539L650.772 26.8223L649.696 26.2544C650.132 25.1185 650.35 24.4117 650.35 24.1341C650.35 23.3769 649.401 22.5565 647.505 21.6731C642.354 19.3004 636.896 18.1141 631.13 18.1141C626.389 18.1141 622.263 18.9849 618.752 20.7265C617.061 21.5847 615.715 22.6953 614.716 24.0584C613.742 25.4214 613.255 26.8601 613.255 28.3746C613.255 29.6367 613.64 30.8356 614.408 31.9715C615.177 33.0821 616.189 33.9151 617.445 34.4704C618.829 35.1014 620.456 35.5431 622.327 35.7955C624.223 36.0227 627.299 36.1994 631.553 36.3256C637.447 36.5023 641.662 36.78 644.199 37.1586C646.736 37.512 648.825 38.143 650.465 39.0517C654.821 41.4496 657 45.0969 657 49.9937C657 54.6634 655.026 58.4874 651.08 61.4659C646.698 64.7977 640.663 66.4637 632.975 66.4637C628.541 66.4637 624.672 66.0219 621.366 65.1385C618.06 64.255 614.114 62.627 609.527 60.2543C608.245 59.6738 607.489 59.3835 607.259 59.3835C606.874 59.3835 606.272 59.8378 605.452 60.7465L604.414 60.1029L610.18 50.5995L611.256 51.2053C610.769 52.215 610.526 52.8965 610.526 53.2499C610.526 54.0576 612.166 55.307 615.446 56.9982C618.393 58.5127 621.225 59.6106 623.942 60.2922C626.684 60.9484 629.656 61.2766 632.86 61.2766C639.343 61.2766 644.263 59.8757 647.62 57.0739C649.85 55.2061 650.965 52.9848 650.965 50.4102C650.965 47.0279 649.056 44.6931 645.237 43.4058C644.007 42.9767 642.726 42.7116 641.393 42.6107C640.086 42.4845 636.345 42.3078 630.169 42.0806C625.761 41.9039 622.301 41.5758 619.79 41.0962C617.304 40.6166 615.088 39.8341 613.14 38.7488C611.32 37.7391 609.872 36.3256 608.796 34.5082C607.745 32.6909 607.22 30.7094 607.22 28.5639C607.22 24.9039 608.604 21.7614 611.372 19.1363C613.422 17.218 616.253 15.7161 619.867 14.6308C623.48 13.5202 627.439 12.9648 631.745 12.9648C635.256 12.9648 638.51 13.3056 641.509 13.9871C644.532 14.6686 647.941 15.8423 651.734 17.5083C652.579 17.8616 653.104 18.0383 653.309 18.0383C653.771 18.0383 654.399 17.5335 655.193 16.5239L656.269 17.0539Z" fill="white" stroke="white" strokeWidth="0.1" strokeMiterlimit="10" />
        <path d="M443.476 16.1379L437.98 25.9063L436.903 25.3383C437.339 24.2025 437.557 23.4957 437.557 23.2181C437.557 22.4608 436.609 21.6405 434.712 20.7571C429.561 18.3844 424.103 17.198 418.337 17.198C413.596 17.198 409.47 18.0689 405.959 19.8105C404.268 20.6687 402.922 21.7793 401.923 23.1423C400.949 24.5054 400.462 25.9441 400.462 27.4586C400.462 28.7207 400.847 29.9196 401.615 31.0555C402.384 32.1661 403.396 32.9991 404.652 33.5544C406.036 34.1854 407.663 34.6271 409.534 34.8795C411.43 35.1067 414.506 35.2834 418.76 35.4096C424.654 35.5863 428.869 35.8639 431.406 36.2426C433.943 36.5959 436.032 37.227 437.672 38.1357C442.029 40.5336 444.207 44.1809 444.207 49.0777C444.207 53.7473 442.234 57.5714 438.287 60.5499C433.905 63.8817 427.87 65.5476 420.182 65.5476C415.748 65.5476 411.879 65.1059 408.573 64.2225C405.267 63.339 401.321 61.711 396.734 59.3383C395.452 58.7577 394.696 58.4675 394.466 58.4675C394.081 58.4675 393.479 58.9218 392.659 59.8305L391.621 59.1868L397.387 49.6835L398.463 50.2893C397.976 51.299 397.733 51.9805 397.733 52.3339C397.733 53.1416 399.373 54.391 402.653 56.0822C405.6 57.5967 408.432 58.6946 411.149 59.3761C413.891 60.0324 416.863 60.3606 420.067 60.3606C426.55 60.3606 431.47 58.9597 434.827 56.1579C437.057 54.29 438.172 52.0688 438.172 49.4942C438.172 46.1119 436.263 43.7771 432.444 42.4898C431.214 42.0607 429.933 41.7956 428.6 41.6947C427.293 41.5685 423.552 41.3918 417.376 41.1646C412.968 40.9879 409.508 40.6598 406.997 40.1802C404.511 39.7006 402.295 38.9181 400.347 37.8328C398.527 36.8231 397.08 35.4096 396.003 33.5922C394.953 31.7748 394.427 29.7934 394.427 27.6479C394.427 23.9879 395.811 20.8454 398.579 18.2203C400.629 16.302 403.461 14.8001 407.074 13.7148C410.687 12.6041 414.646 12.0488 418.952 12.0488C422.463 12.0488 425.717 12.3896 428.716 13.0711C431.74 13.7526 435.148 14.9263 438.941 16.5923C439.786 16.9456 440.312 17.1223 440.517 17.1223C440.978 17.1223 441.606 16.6175 442.4 15.6078L443.476 16.1379Z" fill="white" stroke="white" strokeWidth="0.1" strokeMiterlimit="10" />
        <path d="M557.935 120.891V140.503H591.831C592.917 140.503 593.682 140.33 594.139 139.997C594.596 139.665 594.929 139 595.163 138.026H596.409V148.005H595.163C594.904 147.032 594.546 146.366 594.102 146.034C593.645 145.701 592.88 145.529 591.794 145.529H549.371V144.285C550.383 144.026 551.049 143.681 551.37 143.237C551.691 142.806 551.851 142.042 551.851 140.958V97.2871C551.851 96.2031 551.679 95.4393 551.345 95.0081C551.012 94.5646 550.346 94.2197 549.371 93.961V92.7291H591.338C592.424 92.7291 593.189 92.5689 593.621 92.2363C594.065 91.9037 594.41 91.2508 594.67 90.2529H595.916V100.231H594.67C594.435 99.2582 594.09 98.6053 593.645 98.2727C593.189 97.9277 592.424 97.7676 591.338 97.7676H557.935V115.864H579.825C580.911 115.864 581.676 115.704 582.133 115.359C582.589 115.027 582.922 114.374 583.157 113.388H584.403V123.367H583.157C582.922 122.381 582.577 121.728 582.133 121.396C581.676 121.063 580.911 120.891 579.825 120.891H557.935Z" fill="white" />
        <path d="M521.565 97.7553V140.958C521.565 142.018 521.738 142.769 522.071 143.225C522.404 143.681 523.071 144.026 524.046 144.285V145.529H513.002V144.285C513.977 144.026 514.643 143.681 514.976 143.237C515.309 142.806 515.482 142.042 515.482 140.958V97.7553H497.577C496.491 97.7553 495.726 97.9154 495.27 98.248C494.813 98.5683 494.48 99.2336 494.246 100.231H493.012V90.2529H494.246C494.48 91.2385 494.826 91.9037 495.27 92.2363C495.726 92.5689 496.491 92.7291 497.577 92.7291H539.458C540.544 92.7291 541.309 92.5689 541.765 92.2363C542.222 91.9037 542.555 91.2508 542.789 90.2529H544.023V100.231H542.789C542.555 99.2336 542.209 98.5806 541.765 98.248C541.309 97.9154 540.544 97.7553 539.458 97.7553H521.553H521.565Z" fill="white" />
        <path d="M476.429 141.155V97.4838C476.429 96.3998 476.257 95.636 475.924 95.1802C475.59 94.7244 474.924 94.3918 473.949 94.1577V92.9258H484.993V94.1577C484.006 94.4164 483.352 94.7613 483.019 95.2048C482.686 95.6483 482.513 96.3998 482.513 97.4838V141.155C482.513 142.239 482.673 143.003 482.994 143.434C483.315 143.878 483.981 144.223 484.993 144.481V145.725H473.949V144.481C474.961 144.223 475.627 143.878 475.948 143.434C476.269 143.003 476.429 142.239 476.429 141.155Z" fill="white" />
        <path d="M434.936 145.725L412.675 101.327V141.155C412.675 142.215 412.848 142.966 413.181 143.422C413.514 143.878 414.168 144.223 415.155 144.481V145.725H404.691V144.481C405.679 144.223 406.333 143.878 406.666 143.434C406.999 143.003 407.172 142.239 407.172 141.155V97.4838C407.172 96.3998 406.999 95.636 406.666 95.1802C406.333 94.7244 405.666 94.3918 404.691 94.1577V92.9258H418.376V94.1577C417.117 94.6012 416.476 95.1432 416.476 95.7838C416.476 96.0918 416.895 97.0896 417.747 98.765L435.367 133.567L453.062 98.4571C453.679 97.2251 453.988 96.3505 453.988 95.8331C453.988 95.1679 453.359 94.6135 452.088 94.17V92.9381H465.933V94.17C464.945 94.4287 464.291 94.7736 463.958 95.2171C463.625 95.6606 463.452 96.4121 463.452 97.4962V141.167C463.452 142.227 463.625 142.978 463.958 143.434C464.291 143.89 464.958 144.235 465.933 144.494V145.738H454.889V144.494C455.9 144.235 456.567 143.89 456.888 143.446C457.208 143.003 457.369 142.251 457.369 141.167V101.34L434.911 145.738L434.936 145.725Z" fill="white" />
        <path d="M388.109 141.155V97.4838C388.109 96.3998 387.936 95.636 387.603 95.1802C387.27 94.7244 386.604 94.3918 385.629 94.1577V92.9258H396.673V94.1577C395.686 94.4164 395.032 94.7613 394.698 95.2048C394.365 95.6483 394.193 96.3998 394.193 97.4838V141.155C394.193 142.239 394.353 143.003 394.674 143.434C394.995 143.878 395.661 144.223 396.673 144.481V145.725H385.629V144.481C386.641 144.223 387.307 143.878 387.628 143.434C387.949 143.003 388.109 142.239 388.109 141.155Z" fill="white" />
        <path d="M340.564 140.699H374.349C375.435 140.699 376.2 140.527 376.657 140.194C377.113 139.862 377.447 139.196 377.681 138.223H378.915V148.202H377.681C377.447 147.228 377.101 146.563 376.657 146.231C376.2 145.898 375.435 145.725 374.349 145.725H332V144.481C333.012 144.223 333.678 143.878 333.999 143.434C334.32 143.003 334.48 142.239 334.48 141.155V97.4838C334.48 96.3998 334.308 95.636 333.974 95.2048C333.641 94.7613 332.975 94.4164 332 94.1577V92.9258H343.044V94.1577C342.057 94.4164 341.403 94.7613 341.07 95.2048C340.736 95.6483 340.564 96.3998 340.564 97.4838V140.687V140.699Z" fill="white" />
        <path d="M604.234 141.697V96.9418C604.234 96.1657 604.049 95.5744 603.691 95.1679C603.333 94.749 602.679 94.4164 601.754 94.1577V92.9258H629.654C635.984 92.9258 640.821 93.8004 644.19 95.5497C648.422 97.7425 651.655 101.118 653.876 105.688C655.813 109.68 656.788 114.226 656.788 119.301C656.788 125.313 655.48 130.499 652.877 134.848C650.52 138.716 647.546 141.5 643.943 143.188C640.34 144.875 635.577 145.725 629.666 145.725H601.766V144.481C602.692 144.223 603.346 143.89 603.704 143.471C604.061 143.052 604.246 142.461 604.246 141.685L604.234 141.697ZM610.318 140.687H629.419C635.021 140.687 639.18 139.825 641.894 138.1C645.103 136.03 647.447 132.877 648.953 128.627C649.927 125.793 650.421 122.689 650.421 119.301C650.421 113.166 648.854 108.091 645.732 104.062C644.004 101.845 641.894 100.268 639.414 99.344C636.934 98.4201 633.602 97.952 629.419 97.952H610.318V140.699V140.687Z" fill="white" />
    </svg>
)

function LandingPage() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [openIndex, setOpenIndex] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

    // Define nav links with path/target destinations
    const navLinks = [
        { name: 'Home', path: '/', isPage: true },
        { name: 'Properties', path: '/properties', isPage: true },
        { name: 'About Us', targetId: 'about', isPage: false },
        { name: 'Blogs', targetId: 'blogs', isPage: false },
        { name: 'Contact Us', targetId: 'contact', isPage: false },
    ]

    const handleNavClick = (e, item) => {
        setIsMenuOpen(false) // Close mobile menu if open

        if (item.isPage) {
            // Direct page navigation for routes like /properties or /
            return
        }

        // Handle smooth scrolling for anchor links
        e.preventDefault()

        if (location.pathname !== '/') {
            // If user is NOT on the home page, navigate home first, then scroll
            navigate('/')
            setTimeout(() => {
                const element = document.getElementById(item.targetId)
                if (element) element.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        } else {
            // If already on home page, scroll directly
            const element = document.getElementById(item.targetId)
            if (element) element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const properties = [
        {
            id: 1,
            title: 'Aurora',
            beds: 3,
            baths: 2,
            area: '1100 sq ft',
            type: 'Residential',
            location: 'Jolshiri Sector 09, Dhaka, Bangladesh',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
        },
        {
            id: 2,
            title: 'Suburban Modern',
            beds: 3,
            baths: 2,
            area: '1100 sq ft',
            type: 'Residential',
            location: 'Banasree, Dhaka, Bangladesh',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        },
        {
            id: 3,
            title: 'Serendipity',
            beds: 3,
            baths: 2,
            area: '1100 sq ft',
            type: 'Residential',
            location: 'Jolshiri Sector 16, Dhaka, Bangladesh',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
        },
    ];

    // Helper function to handle smooth scrolling smoothly across all browsers
    const scrollToSection = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false); // Close mobile menu if open
    };

    // Handle scroll active dot state on mobile
    const handleScroll = (e) => {
        const scrollPosition = e.target.scrollLeft;
        const itemWidth = e.target.clientWidth * 0.85;
        const index = Math.round(scrollPosition / itemWidth);
        setActiveSlide(index);
    };

    const services = [
        {
            id: 1,
            title: 'Property Marketing & Sales',
            description:
                'Lorem ipsum dolor sit amet consectetur. Adipiscing accumsan maecenas sed at viverra placerat sed eu pellentesque. Vitae condimentum lobortis sed venenatis massa. Nunc a nam fringilla vivamus augue.',
            icon: (
                <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 21V3" />
                    <path d="M3 5h14l3 3-3 3H3" />
                    <path d="M8 11v4" />
                    <path d="M12 11v4" />
                </svg>
            ),
        },
        {
            id: 2,
            title: 'Expert Buyer Representation',
            description:
                'Lorem ipsum dolor sit amet consectetur. Adipiscing accumsan maecenas sed at viverra placerat sed eu pellentesque. Vitae condimentum lobortis sed venenatis massa. Nunc a nam fringilla vivamus augue.',
            icon: (
                <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                >
                    <path d="M11 11.5L8.5 9" />
                    <path d="M16 8l-4 4" />
                    <path d="M7 16l-3-3a2 2 0 0 1 0-2.83l3-3" />
                    <path d="M17 16l3-3a2 2 0 0 0 0-2.83l-3-3" />
                    <path d="M7 16l4 4a2 2 0 0 0 2.83 0l4-4" />
                </svg>
            ),
        },
        {
            id: 3,
            title: 'Property Management Services',
            description:
                'Lorem ipsum dolor sit amet consectetur. Adipiscing accumsan maecenas sed at viverra placerat sed eu pellentesque. Vitae condimentum lobortis sed venenatis massa. Nunc a nam fringilla vivamus augue.',
            icon: (
                <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                >
                    <circle cx="7.5" cy="15.5" r="3.5" />
                    <path d="M10 13l10.5-10.5" />
                    <path d="M16 5l2 2" />
                    <path d="M18 3l2 2" />
                </svg>
            ),
        },
        {
            id: 4,
            title: 'Real Estate Investment & Advisory',
            description:
                'Lorem ipsum dolor sit amet consectetur. Adipiscing accumsan maecenas sed at viverra placerat sed eu pellentesque. Vitae condimentum lobortis sed venenatis massa. Nunc a nam fringilla vivamus augue.',
            icon: (
                <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 3v18h18" />
                    <path d="M18 9l-5 5-4-4-4 4" />
                    <path d="M14 9h4v4" />
                </svg>
            ),
        },
    ]

    // Carousel slide data
    const slides = [
        {
            id: 1,
            title: 'Get to know us?',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        },
        {
            id: 2,
            title: 'Our Architecture Philosophy',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            poster: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        },
        {
            id: 3,
            title: 'Sustainable Living Spaces',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            poster: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        },
        {
            id: 4,
            title: 'Crafting Modern Interiors',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4',
            poster: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
        },
    ]

    const handleNext = () => {
        setIsPlaying(false)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }

    const handlePrev = () => {
        setIsPlaying(false)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const currentSlide = slides[currentIndex]

    const articles = [
        {
            id: 1,
            date: 'Aug 12, 2021',
            title: 'Building with Trust and Efficiency',
            image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
            // Maintains portrait aspect ratio across all screen sizes
            aspectRatio: 'aspect-[3/4]',
        },
        {
            id: 2,
            date: 'Feb 2, 2022',
            title: 'Nature Prioritized with Modern',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            // Maintains landscape aspect ratio across all screen sizes
            aspectRatio: 'aspect-[4/3]',
        },
        {
            id: 3,
            date: 'Sept 22, 2022',
            title: 'A Bright and Safe Neighborhood',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            // Maintains tall portrait aspect ratio across all screen sizes
            aspectRatio: 'aspect-[3/5]',
        },
        {
            id: 4,
            date: 'Jan 11, 2023',
            title: 'Tips for First-time Homebuyers',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
            // Maintains landscape aspect ratio across all screen sizes
            aspectRatio: 'aspect-[4/3]',
        },
    ]

    const faqs = [
        {
            question: 'How do I start searching for a property with Aurelian & Co?',
            answer:
                'Lorem ipsum dolor sit amet consectetur. Vestibulum sed malesuada maecenas neque et laoreet arcu. Purus pretium euismod lacus nibh massa vestibulum mauris in. Dui molestie augue fermentum eget. Quis nunc faucibus odio gravida est adipiscing. Phasellus ut non magna viverra iaculis feugiat blandit ut volutpat. Est mattis nunc maecenas tempus. Risus tellus interdum aliquam neque suspendisse vitae iaculis. Turpis sit eget id magnis libero nulla tellus aliquam. Rhoncus nunc tellus duis ipsum malesuada aliquet arcu leo. Viverra neque dolor lobortis tellus vitae risus sociis dis. Integer netus lectus quis tristique nec turpis. Dictumst nunc vitae ipsum viverra. Dictum dolor congue sit amet fames ut risus donec non. Ac mauris erat ipsum praesent nec lobortis nam at nisi.',
        },
        {
            question: 'How can I determine my budget for buying a home?',
            answer:
                'Lorem ipsum dolor sit amet consectetur. Vestibulum sed malesuada maecenas neque et laoreet arcu. Purus pretium euismod lacus nibh massa vestibulum mauris in. Dui molestie augue fermentum eget. Quis nunc faucibus odio gravida est adipiscing.',
        },
        {
            question: 'What are the common mistakes to avoid purchasing a property?',
            answer:
                'Lorem ipsum dolor sit amet consectetur. Vestibulum sed malesuada maecenas neque et laoreet arcu. Purus pretium euismod lacus nibh massa vestibulum mauris in. Dui molestie augue fermentum eget.',
        },
        {
            question: 'How does Aurelian & Co assist with the mortgage application process?',
            answer:
                'Lorem ipsum dolor sit amet consectetur. Vestibulum sed malesuada maecenas neque et laoreet arcu. Purus pretium euismod lacus nibh massa vestibulum mauris in. Dui molestie augue fermentum eget.',
        },
    ]

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle email submission logic here
        setEmail('')
    }
    return (
        <>
            {/* Home / Hero Section */}
            <section id="home" className="relative w-full min-h-screen bg-[#111111] bg-[url('https://abcl.com.bd/wp-content/uploads/2025/09/6-1.jpg')] bg-cover bg-center px-4 py-6 text-white flex flex-col justify-between font-sans sm:px-6 md:px-12 md:py-8 lg:px-8">

                {/* Top Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                {/* Header / Navigation Bar Container */}
                <div className="w-full max-w-7xl mx-auto">
                    <nav className="relative z-20 flex items-center justify-between">
                        {/* Brand Logo */}
                        <div className="flex items-center">
                            <Link to="/">
                                <LogoSVG />
                            </Link>
                        </div>

                        {/* Desktop Navbar Pill Container */}
                        <div className="hidden md:flex items-center bg-white text-black rounded-full px-8 py-3.5 shadow-lg">
                            <div className="flex gap-10 text-xs tracking-wider font-semibold">
                                {navLinks.map((item) =>
                                    item.isPage ? (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className="hover:opacity-70 transition-opacity uppercase cursor-pointer"
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={item.name}
                                            href={`#${item.targetId}`}
                                            onClick={(e) => handleNavClick(e, item)}
                                            className="hover:opacity-70 transition-opacity uppercase cursor-pointer"
                                        >
                                            {item.name}
                                        </a>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Mobile Hamburger Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white focus:outline-none"
                            aria-label="Toggle Navigation"
                        >
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Mobile Navigation Menu Dropdown */}
                        {isMenuOpen && (
                            <div className="absolute top-16 right-0 left-0 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 text-center md:hidden">
                                {navLinks.map((item) =>
                                    item.isPage ? (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-semibold tracking-wider py-2 hover:text-gray-300 cursor-pointer"
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={item.name}
                                            href={`#${item.targetId}`}
                                            onClick={(e) => handleNavClick(e, item)}
                                            className="text-base font-semibold tracking-wider py-2 hover:text-gray-300 cursor-pointer"
                                        >
                                            {item.name}
                                        </a>
                                    )
                                )}
                            </div>
                        )}
                    </nav>
                </div>

                {/* Main Hero Content Area */}
                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between my-auto py-12 gap-12">

                    {/* Main Headline & Explore Link */}
                    <div className="flex flex-col items-start max-w-3xl">
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight">
                            Find your best <br /> home to <span className="italic font-light">living</span>
                        </h1>

                        {/* Underlined Sub-link with Diagonal Arrow Icon */}
                        <a
                            href="#properties"
                            onClick={(e) => scrollToSection(e, 'properties')}
                            className="ml-1 inline-flex items-center gap-2 mt-6 text-sm tracking-wide font-medium border-b border-white pb-0.5 group hover:opacity-80 transition-opacity"
                        >
                            Explore Properties
                            <svg
                                className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 11L11 1M11 1H3M11 1V9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Paragraph & Get Started Button Container */}
                    <div className="flex flex-col items-start md:items-end self-end w-full max-w-lg gap-4 text-right">
                        <p className="text-xs md:text-sm text-left md:text-right leading-relaxed text-gray-200 font-normal">
                            Lorem ipsum dolor sit amet consectetur. Facilisis porttitor at vitae cursus morbi. In amet lobortis lectus nullam sed a purus volutpat faucibus. Pulvinar pellentesque ipsum est a posuere urna.
                        </p>

                        <button
                            onClick={(e) => scrollToSection(e, 'properties')}
                            className="bg-white text-black font-medium px-6 py-2 rounded-full text-xs md:text-xs tracking-wide inline-flex items-center gap-2 transition-transform duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-md"
                        >
                            Get Started
                            <svg
                                className="w-3 h-3"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 11L11 1M11 1H3M11 1V9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                </div>
            </section>

            {/* Properties Section */}
            <section id="properties" className="bg-[#f2f2f2] py-60 min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 font-sans text-gray-900 flex items-center justify-center">
                <div className="max-w-7xl w-full mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                Highlighted <br />
                                <span className="relative inline-block italic font-light">
                                    <span className="relative z-10">properties</span>
                                    <span className="absolute bottom-1 left-0 right-0 h-5 sm:h-9 bg-[#eaff85] -z-0 transform -rotate-1"></span>
                                </span>
                            </h2>
                        </div>

                        <div className="flex flex-col items-start md:items-end max-w-sm gap-4">
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed md:text-right">
                                Lorem ipsum dolor sit amet consectetur. Facilisis ddfd porttitor at vitae cursus morbi. In amet lobortis l
                            </p>
                            <a
                                href="#properties"
                                className="inline-flex items-center gap-1.5 bg-[#eaff85] hover:bg-[#d8f858] text-gray-900 text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm"
                            >
                                View all
                                <svg
                                    className="w-3 h-3"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 11L11 1M11 1H3M11 1V9"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Property Cards Container */}
                    <div
                        onScroll={handleScroll}
                        className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0"
                    >
                        {properties.map((item) => (
                            <div
                                key={item.id}
                                className="group relative h-112.5 sm:h-120 w-[85vw] min-w-[85vw] sm:w-[60vw] sm:min-w-[60vw] md:w-full md:min-w-0 flex-shrink-0 snap-center rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <h1 className="absolute uppercase transform rotate-90 top-20 -right-10 text-center text-2xl font-thin font-stretch-120% text-white z-10">
                                   {item.type}
                                </h1>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                                    <h3 className="text-2xl sm:text-3xl font-medium mb-1 tracking-wide">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center gap-1 text-sm text-gray-300">
                                        <svg
                                            className="w-3.5 h-3.5 shrink-0 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Pagination Indicators */}
                    <div className="flex md:hidden justify-center items-center gap-2 mt-4">
                        {properties.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-6 bg-[#eaff85]' : 'w-2 bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Placeholder Sections for remaining links */}
            <section id="about" className="bg-white py-60 px-4 sm:px-8 md:px-12 lg:px-20 font-sans text-gray-900">
                <div className="max-w-6xl mx-auto">

                    {/* Top "Who we are?" Highlight Statement */}
                    <div className="text-center mb-40">
                        {/* Highlight Badge Title */}
                        <div className="inline-block relative mb-6">
                            <span className="absolute inset-x-0 bottom-0.5 h-3 bg-[#eaff85] -z-0 transform -rotate-1" />
                            <h2 className="relative z-10 text-3xl sm:text-4xl font-bold italic tracking-tight text-black">
                                Who we are?
                            </h2>
                        </div>

                        {/* Statement Text */}
                        <p className="text-2xl sm:text-3xl md:text-4xl leading-tight sm:leading-snug max-w-4xl mx-auto font-normal text-gray-400">
                            We are a team of passionate expert{' '}
                            <span className="text-black font-semibold">
                                creating thoughtful, sustainable, and inspiring spaces.
                            </span>{' '}
                            from search to settlement,{' '}
                            <span>we work with purpose and precision to bring</span>{' '}
                            <span className="text-black font-semibold">
                                your dream house to life.
                            </span>
                        </p>
                    </div>

                    {/* Services Section */}
                    <div id="services">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none text-black">
                                What service we <br /> provide?
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 max-w-xs md:text-right leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Facilisis porttitor at vitae cursus morbi. In amet lobortis I
                            </p>
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-[#f4f4f4] rounded-2xl p-6 sm:p-8 flex flex-col items-start transition-shadow duration-300 hover:shadow-md"
                                >
                                    {/* Yellow Circle Icon */}
                                    <div className="w-11 h-11 rounded-full bg-[#eaff85] flex items-center justify-center mb-8 sm:mb-12">
                                        {service.icon}
                                    </div>

                                    {/* Card Title */}
                                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">
                                        {service.title}
                                    </h4>

                                    {/* Card Description */}
                                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full max-w-5xl mx-auto py-60 p-4 sm:p-6 font-sans">
                <div className="relative w-full aspect-[16/9] md:aspect-[21/10] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl group">

                    {/* Video / Image Display */}
                    {isPlaying ? (
                        <video
                            src={currentSlide.videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            controls
                            onEnded={() => setIsPlaying(false)}
                        />
                    ) : (
                        <img
                            src={currentSlide.poster}
                            alt={currentSlide.title}
                            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                        />
                    )}

                    {/* Gradient Overlay for Readable Text */}
                    {!isPlaying && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 pointer-events-none" />
                    )}

                    {/* Top Right Counter Badge */}
                    {!isPlaying && (
                        <div className="absolute top-6 right-6 text-white font-medium text-sm sm:text-base tracking-widest bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                            {currentIndex + 1}/{slides.length}
                        </div>
                    )}

                    {/* Center Play Button */}
                    {!isPlaying && (
                        <button
                            onClick={togglePlay}
                            aria-label="Play video"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f1fc7b] hover:bg-[#e2f063] flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 shadow-lg z-10"
                        >
                            <svg
                                className="w-6 h-6 text-black fill-current translate-x-0.5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    )}

                    {/* Bottom Overlay Controls & Title */}
                    {!isPlaying && (
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                            {/* Slide Title */}
                            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-normal tracking-tight drop-shadow-md">
                                {currentSlide.title}
                            </h2>

                            {/* Navigation Arrows */}
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handlePrev}
                                    aria-label="Previous slide"
                                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all duration-200 active:scale-90"
                                >
                                    <svg
                                        className="w-5 h-5 stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>

                                <button
                                    onClick={handleNext}
                                    aria-label="Next slide"
                                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all duration-200 active:scale-90"
                                >
                                    <svg
                                        className="w-5 h-5 stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-white py-60 px-4 sm:px-8 md:px-12 lg:px-20 font-sans text-gray-900">
                <div className="max-w-6xl mx-auto">

                    {/* Section Title */}
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-10 leading-tight">
                        Our Trending <br /> Article
                    </h2>

                    {/* Grid layout: Uses 2 columns on mobile (grid-cols-2) to preserve side-by-side staggered height comparison */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
                        {articles.map((article) => (
                            <article key={article.id} className="flex flex-col group cursor-pointer">

                                {/* Aspect Ratio Container (fixed aspect ratio applied on mobile & desktop) */}
                                <div
                                    className={`w-full ${article.aspectRatio} rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 mb-2.5 sm:mb-3`}
                                >
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Date */}
                                <time className="text-[11px] sm:text-sm text-gray-400 font-normal mb-1">
                                    {article.date}
                                </time>

                                {/* Title */}
                                <h3 className="text-sm sm:text-lg font-semibold text-black leading-snug group-hover:text-gray-700 transition-colors">
                                    {article.title}
                                </h3>

                            </article>
                        ))}
                    </div>

                </div>
            </section>

            <section className="bg-white py-60 px-4 sm:px-8 md:px-12 lg:px-20 font-sans text-gray-900">
                <div className="max-w-5xl mx-auto">

                    {/* Header Title with Highlight */}
                    <div className="mb-14">
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-black leading-tight">
                            Frequently Asked
                        </h2>
                        <div className="inline-block relative mt-1">
                            <span className="absolute inset-x-0 bottom-1 h-3.5 bg-[#f1fc7b] z-0" />
                            <span className="relative z-10 text-4xl sm:text-5xl font-bold italic tracking-tight text-black">
                                Questions
                            </span>
                        </div>
                    </div>

                    {/* FAQ Accordion List */}
                    <div className="divide-y divide-gray-300 border-b border-gray-300">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index

                            return (
                                <div key={index} className="py-6">
                                    {/* Accordion Toggle Button */}
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between text-left focus:outline-none group"
                                    >
                                        <span className="text-lg sm:text-xl font-semibold text-black pr-4 leading-snug">
                                            {faq.question}
                                        </span>

                                        {/* Chevron Icon */}
                                        <svg
                                            className={`w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Collapsible Content */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </section>

            {/* 6. Where To Find Us (Map Location Section) */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-4xl sm:text-5xl mb-8 text-center font-bold tracking-tight text-black leading-tight">
                    Where To Find Us
                </h2>

                <div className="w-full h-96 relative overflow-hidden">
                    {/* Mock Interactive Map Frame */}
                    <iframe
                        title="Property Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33121.2835227154!2d90.40684568663994!3d23.798454765559594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x800d3010b50e965%3A0x7015c488dd8ee94c!2sAB%20Assets%20Limited!5e1!3m2!1sen!2sbd!4v1786868208677!5m2!1sen!2sbd"
                        className="w-full h-full rounded-xl border-0 grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default LandingPage