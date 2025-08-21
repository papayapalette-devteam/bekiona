import './App.css';
import Contact from './Components/Contact';
import Footer from './Components/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import VitamincFacewash from './Components/vitamincFacewash';
import Antiacnefacewash from './Components/Antiacnefacewash';
import Goldscrubfacewash from './Components/Goldscrubfacewash';
import Antihairfallshampoo from './Components/Antihairfallshampoo';
import Rosemaryhairoil from './Components/Rosemaryhairoil';
import Hairserum from './Components/Hairserum';
import Glutasoap from './Components/Glutasoap';
import Home1 from './Components/home1';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './Components/Admin/Sidebar';
import Dashboard from './Components/Admin/Dashboard';
import Addproduct from './Components/Admin/Addproduct';
import Termcondition from './Components/Termcondition';
import Privacypolicy from './Components/Privacypolicy';
import Ewaste from './Components/Ewaste';
import Cancilationpolicy from './Components/Cancilationpolicy';
import Deliverycancel from './Components/Deliverycancel';
import Aboutus from './Components/Aboutus';
import Faq from './Components/Faq';
import Allproductlist from './Components/Admin/Allproductlist';
import Banner from './Components/Admin/Banner';
import Accountsetting from './Components/Admin/Accountsetting';
import Sinup from './Components/Admin/Sinup';
import Login from './Components/Admin/Login';
import Forgatpassword from './Components/Admin/Forgatpassword';
import PrivateRoute from './Components/protectedroute';
import OAuthGuard from '../src/Components/protectedroute';
import { AuthProvider } from '../src/Components/authguard';
import Blog from './Components/Admin/Blog';
import Blog1 from './Components/Blog1';
import Category from './Components/category';
import Combo from './Components/Combo';
import Blog2 from './Components/Blog2';
import Sidebarcu from './Components/Customerdashboard/Sidebarcu';
import Personalinfo from './Components/Customerdashboard/Personalinfo';
import Manageadds from './Components/Customerdashboard/Manageadds';
import Cuheader from './Components/Customerdashboard/Cuheader';
import Cudashboard from './Components/Customerdashboard/Cudashboard';
import Myorders from './Components/Customerdashboard/myorders';
import Usermessage from './Components/Admin/Usermessage';
import Alluser from './Components/Admin/Alluser';
import Trackorder from './Components/trackorder';





function App() {
  return (
    <AuthProvider>
     <BrowserRouter>

 <div>
    
     <Routes>
    <Route path='/' element={<Home1/>}/>
     <Route path='/contact' element={<Contact/>}/>

     <Route path='/product/:productid' element={<VitamincFacewash/>}/>
     <Route path='/product/676a8c93d532d94d2ae75a53' element={<Antiacnefacewash/>}/>
     <Route path='/product/676d3602cf4b23cfcf414815' element={<Goldscrubfacewash/>}/>
     <Route path='/antihairfallshampoo' element={<Antihairfallshampoo/>}/>
     <Route path='/rosemaryhairoil' element={<Rosemaryhairoil/>}/>
     <Route path='/hairserum' element={<Hairserum/>}/>
     <Route path='/glutasoap' element={<Glutasoap/>}/>


     <Route path='/addproduct' element={<PrivateRoute><Addproduct/></PrivateRoute>}/>
     <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
     <Route path='/term&condition' element={<Termcondition/>}/>
     <Route path='/privacypolicy' element={<Privacypolicy/>}/>
     <Route path='/ewaste' element={<Ewaste/>}/>
     <Route path='/cancelpolicy' element={<Cancilationpolicy/>}/>
     <Route path='/deliverycancel' element={<Deliverycancel/>}/>
     <Route path='/aboutus' element={<Aboutus/>}/>
     <Route path='/faq' element={<Faq/>}/>
     <Route path='/allproductlist' element={<PrivateRoute><Allproductlist/></PrivateRoute>}/>
     <Route path='/banner' element={<PrivateRoute><Banner/></PrivateRoute>}/>
     <Route path='/accountsetting' element={<PrivateRoute><Accountsetting/></PrivateRoute>}/>
     <Route path='/usermessage' element={<PrivateRoute><Usermessage/></PrivateRoute>}/>
     <Route path='/alluser' element={<PrivateRoute><Alluser/></PrivateRoute>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/singup' element={<Sinup/>}/>
     <Route path='/forgot' element={<Forgatpassword/>}/>
     <Route path='/blog' element={<PrivateRoute><Blog/></PrivateRoute>}/>
     <Route path='/blog1' element={<Blog1/>}/>
     <Route path='/blog2' element={<Blog2/>}/>
     <Route path='/categoryproduct' element={<Category/>}/>
     <Route path='/combo' element={<Combo/>}/>
     <Route path='/personalinfo' element={<PrivateRoute><Personalinfo/></PrivateRoute>}/>
     <Route path='/manageadds' element={<PrivateRoute><Manageadds/></PrivateRoute>}/>
     <Route path='/cudasboard' element={<PrivateRoute><Cudashboard/></PrivateRoute>}/>
     <Route path='/myorders' element={<PrivateRoute><Myorders/></PrivateRoute>}/>
     <Route path='/track-order' element={<Trackorder/>}/>
     </Routes>
     </div>
     </BrowserRouter>
     
</AuthProvider>
    
  );
}

export default App;
