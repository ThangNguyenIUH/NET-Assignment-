import React from 'react'

function Header() {
  return (
   <div>
      <title>Linh Kiện Điện Tử Chính Hãng Giá Tốt</title>
      <div className='header-outs' id='home'>
      <div className='header-bar'>
         <div className='info-top-grid'>
            <div className='info-contact-agile'>
            <ul>
               <li>
               <span className ='fas fa-phone-volume'>...</span>
                     <p>+(84)97 1630 986</p>
               </li>
               <li>
               <span className ='fas fa-envelope'></span>
                     <p><a href="mailto:info@example.com">cuahanglinhkienNT@gmail.com</a></p>
               </li>
            </ul>
            </div>

         </div>

      </div>
      </div>
      <div className='hedder-up row'>
         <div className='col-lg-3 col-md-3' logo-head>
            <h1>
               <a className='navbar-brand' href="">Linh Kiện NT</a>
            </h1>
            <div className='col-lg-5 col-md-6 search-right' >
               <form className='form-inline my-lg-0'>
                  <input className='form-control mr-sm-2' type="Search" placeholder='Nhập từ khóa muốn tìm kiếm' />
                  <button className='btn' type='submit'>Tìm Kiếm</button>
               </form>
            </div>
            <div className='col-lg-4 col-md'>

            </div>

         </div>
      </div>
      </div>
  )
}

export default Header