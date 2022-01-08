import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import Loading from './components/layouts/Loading/Loading';
import { checkUserStatus, logOut, clearMessages, clearErrors } from './actions/userActions';
import { getAllPosts, getMyPosts } from './actions/postActions';
import Navbar from './components/layouts/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import Registration from './components/pages/Registration/Registration';
import Login from './components/pages/Login/Login';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword';
import WritePost from './components/pages/Post/WritePost';
import MyPosts from './components/pages/MyPosts/MyPosts';
import User from './components/pages/User/User'


const App = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { loading, isAuthenticated, message, error } = useSelector(state => state.user);
	const handleLogout = () => {
		dispatch(logOut());
	}
	useEffect(() => {
		dispatch(getAllPosts());
		dispatch(getMyPosts());
		dispatch(checkUserStatus());
		if (message != undefined) {
			alert.success(message);
			dispatch(clearMessages());
		}
		if (error != undefined) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, message, error])
	return (
		<>
			<Router>
				<Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
				<Switch >
					<Route exact path="/"><Home /></Route>
					<Route exact path="/register"><Registration /></Route>
					<Route exact path="/login"><Login /></Route>
					<Route exact path="/forgot-password"><ForgotPassword /></Route>
					<Route exact path='/write'><WritePost /></Route>
					<Route exact path='/my-posts'><MyPosts /></Route>
					<Route exact path='/me'><User /></Route>
				</Switch>
				{loading == true ? <Loading /> : null}
			</Router>
		</>
	)
}

export default App;
