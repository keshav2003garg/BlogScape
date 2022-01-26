import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
					<Route exact path="/posts/:id"><SinglePost /></Route>
					{!loading && <Route exact path='/updatePost/:id'>{isAuthenticated ? <UpdatePost /> : <Redirect to='/login' />}</Route>}
					{!loading && <Route exact path='/write'>{isAuthenticated ? <WritePost /> : <Redirect to='/login' />}</Route>}
					{!loading && <Route exact path='/my-posts'>{isAuthenticated ? <MyPosts /> : <Redirect to='/login' />}</Route>}
					{!loading && <Route exact path='/me'>{isAuthenticated ? <User /> : <Redirect to='/login' />}</Route>}
				</Switch>
				{loading ? <Loading /> : null}
			</Router>
		</>
	)
}

export default App;
