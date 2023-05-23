import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import Loading from './components/layouts/Loading/Loading';
import { checkUserStatus, logOut, clearMessages, clearErrors } from './actions/userActions';
import { clearMyPosts } from './actions/postActions';
import Navbar from './components/layouts/Navbar/Navbar';

import Home from './components/pages/Home/Home';
import Registration from './components/pages/Registration/Registration';
import Login from './components/pages/Login/Login';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword';
import WritePost from './components/pages/Post/WritePost';
import MyPosts from './components/pages/MyPosts/MyPosts';
import User from './components/pages/User/User';
import SinglePost from './components/pages/Post/SinglePost';
import UpdatePost from './components/pages/Post/UpdatePost';


const App = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { loading, isAuthenticated, message, error } = useSelector(state => state.user);
	const [isVisible, setIsVisible] = useState(true);
	const handleLogout = () => {
		dispatch(logOut());
		dispatch(clearMyPosts());
	}
	useEffect(() => {
		dispatch(checkUserStatus());
		if (message) {
			alert.success(message);
			dispatch(clearMessages());
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		window.addEventListener("scroll",()=>{
			setIsVisible(window.pageYOffset < 10);
		})
		return () => {
			window.removeEventListener("scroll",()=>{
				setIsVisible(window.pageYOffset < 10);
			});
		}
	}, [dispatch, message, error])
	return (
		<>
			<Router>
				{<Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
				<Routes >
					<Route exact path="/" element={<Home />}></Route>
					<Route exact path="/register" element={<Registration />}></Route>
					<Route exact path="/login" element={<Login />}></Route>
					<Route exact path="/forgot-password" element={<ForgotPassword />}></Route>
					<Route exact path="/posts/:id" element={<SinglePost />}></Route>
					{!loading && <Route exact path='/updatePost/:id' element={isAuthenticated ? <UpdatePost /> : <Navigate to='/login' />}></Route>}
					{!loading && <Route exact path='/write' element={isAuthenticated ? <WritePost /> : <Navigate to='/login' />}></Route>}
					{!loading && <Route exact path='/my-posts' element={isAuthenticated ? <MyPosts /> : <Navigate to='/login' />}></Route>}
					{!loading && <Route exact path='/me' element={isAuthenticated ? <User /> : <Navigate to='/login' />}></Route>}
				</Routes>
				{loading ? <Loading /> : null}
			</Router>
		</>
	)
}

export default App;
