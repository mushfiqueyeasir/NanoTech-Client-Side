import './App.css'
import { Route, Routes } from "react-router-dom";
import HomeBanner from "./components/Page/Home/HomeBanner/HomeBanner";
import Join from "./components/Page/Join/Join";
import Header from "./components/Shared/Header/Header";
import Parts from './components/Page/Parts/Parts/Parts';
import PartsDetails from './components/Page/Parts/PartsDetails/PartsDetails';
import Reviews from './components/Page/Reviews/Reviews/Reviews';
import Footer from './components/Shared/Footer/Footer';
import Article from './components/Page/Home/Article/Article';
import ArticleFacilities from './components/Page/Home/ArticleFacilities/ArticleFacilities';
import AticleAchivement from './components/Page/Home/ArticleAchivement/AticleAchivement'
import ContactUs from './components/Page/Home/ContactUS/ContactUs';
import RequireAuth from './components/Auth/RequireAuth';
import UserAuth from './components/Auth/UserAuth';
import Brands from './components/Page/Home/Brands/Brands';
import QuestionAnswer from './components/Page/Home/QuestionAnswer/QuestionAnswer';
import Dashboard from './components/Page/Dashboard/Dashboard/Dashboard';
import DashBoardNavbar from './components/Page/Dashboard/DashboardNavbar/DashBoardNavbar';
import MyProfile from './components/Page/Dashboard/MyProfile/MyProfile';
import MyOrder from './components/Page/Dashboard/MyOrder/MyOrder';
import AddReview from './components/Page/Dashboard/AddReview/AddReview';
import ManageOrder from './components/Page/Dashboard/ManageOrder/ManageOrder';
import AddProduct from './components/Page/Dashboard/AddProduct/AddProduct';
import MakeAdmin from './components/Page/Dashboard/MakeAdmin/MakeAdmin';
import ManageProduct from './components/Page/Dashboard/ManageProduct/ManageProduct';
import RequireAdmin from './components/Auth/RequireAdmin';
import RequireUser from './components/Auth/RequireUser';
import Payment from './components/Page/Dashboard/Payment/Payment';
import Error from './components/Shared/Error/Error';

function App() {


  return (
    <div className="">

      <Routes>

        <Route path="/" element={<> <Header /><HomeBanner />  <Article /> <Parts /> <ArticleFacilities /> <Reviews /><Brands />  <AticleAchivement /> <ContactUs /><QuestionAnswer /> <Footer /></>}></Route>
        <Route path="/home" element={<> <Header /><HomeBanner />  <Article /> <Parts /> <ArticleFacilities /> <Reviews /><Brands />  <AticleAchivement /> <ContactUs /><QuestionAnswer /> <Footer /></>}></Route>

        <Route path="/parts" element={<> <Header /><Parts /> <Footer /></>}></Route>
        <Route path="/parts/:id" element={
          <RequireAuth>
            <Header />
            <PartsDetails />
          </RequireAuth>
        } />

        <Route path="/review" element={<> <Header /><Reviews /><Footer /></>}></Route>



        <Route path="/dashboard" element={<>
          <RequireAuth>
            <DashBoardNavbar />
            <Dashboard />
          </RequireAuth>
        </>}>
          <Route index element={<MyProfile />}></Route>

          <Route path='order' element={
            <RequireUser><MyOrder /></RequireUser>
          }></Route>
          <Route path='order/payment/:id' element={
            <RequireUser><Payment /></RequireUser>
          }></Route>

          <Route path='addReview' element={
            <RequireUser><AddReview /></RequireUser>
          }></Route>
          <Route path='manageOrder' element={
            <RequireAdmin><ManageOrder /></RequireAdmin>
          }></Route>
          <Route path='addProduct' element={
            <RequireAdmin><AddProduct /></RequireAdmin>
          }></Route>
          <Route path='makeAdmin' element={
            <RequireAdmin><MakeAdmin /></RequireAdmin>
          }></Route>
          <Route path='manageProduct' element={
            <RequireAdmin><ManageProduct /></RequireAdmin>
          }></Route>
        </Route>


        <Route path="/join" element={<>
          <UserAuth>
            <Header />
            <Join />
          </UserAuth>
        </>}></Route>

        <Route path="*" element={<> <Header /><Error /> </>}></Route>
      </Routes>


    </div>
  );
}

export default App;
