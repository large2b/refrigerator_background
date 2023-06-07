import Vue from 'vue'
import Router, { RouterLink } from 'vue-router'
import Home from '@/views/index'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const constantRouterMap = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children:[
			{
				path: 'Feedback',
				name: 'Feedback',
				component: () => import('../views/Feedback/index.vue'),
				children:[
					{
						path: 'FeedbackDetail/:id',
						name: 'FeedbackDetail',
						component: () => import('../views/Feedback/FeedbackDetail'),
					},
					{
						path: 'FeedbackList',
						name: 'FeedbackList',
						component: () => import('../views/Feedback/List/FeedbackList')
					}
				]
			},

			{
				path: 'Content',
				name: 'Content',
				component: () => import('../views/Content/index'),
				children:[
					{
						path: 'ContentList',
						name: 'ContentList',
						component: () => import('../views/Content/List/ContentList'),
					},
					{
						/**
						 * mode = new | modify
						 */
						path: 'CreateContent/:mode',	
						name: 'CreateContent',
						component: () => import('../views/Content/Create/CreateContent'),
					}
				]
			},
			{
				path: 'Recipe',
				name: 'Recipe',
				component: () => import('../views/Recipe/index'),
				children:[
					{
						path:'RecipeList',
						name:'RecipeList',
						component: () => import('../views/Recipe/List/RecipeList')
					},
					{
						path:'CreateRecipe/:mode',
						name:'CreateRecipe',
						component: () => import('../views/Recipe/Create/CreateRecipe')
					}
				]
			},
			{
				path: 'User',
				name: 'User',
				component: () => import('../views/User/index'),
				children: [
					{
						path: 'UserStatistic',
						name: 'UserStatistic',
						component: () => import('../views/User/Statistic/UserStatistic'),
						// component: () => import('../views/User/index'),
					},
					{
						path: 'UserList',
						name: 'UserList',
						component: () => import('../views/User/List/UserList'),
					},
				]
			}
		]
	},
	{	path:'/login', component: () => import('@/views/login/index'), hidden: true },
	{	path:'*', redirect: '/404', component: () => import('@/views/404'), hidden: false },
]

const createRouter = () => new Router({
	scrollBehavior: () => ({y: 0}),
	routes: constantRouterMap
})

const router = createRouter()

export default router

export const asyncRouterMap = [
	{	path:'*', redirect: '/404', component: () => import('@/views/404'), hidden: true },
]






