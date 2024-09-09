import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainpage',
      component: () => import('../components/main/MainPage.vue'),
      children: [
        {
          path: '',
          name: 'listtopic',
          redirect: { name: 'listtopic' }
        },
        {
          path: '/list-topic',
          name: 'listtopic',
          component: () => import('@/components/list-topic/ListTopic.vue'),
          children: [
            {
              path: '/create-topic',
              name: 'createtopic',
              component: () => import('../components/modal/modal-auth/ModalAuth.vue')
            }
          ]
        },
        {
          path: '/personal-area',
          name: 'personalarea',
          component: () => import('../components/personal-area/PersonalArea.vue')
        },
        {
          path: '/user-settings',
          name: 'usersettings',
          component: () => import('../components/user-settings/UserSettings.vue')
        },
        {
          path: '/favorite-topics',
          name: 'favoritetopics',
          component: () => import('../components/favorites-topic/ListFavoriteTopic.vue')
        },
        {
          path: '/notification',
          name: 'notification',
          component: () => import('../components/notification/NotificationMessages.vue')
        },
        {
          path: '/search-friends',
          name: 'searchfriends',
          component: () => import('../components/list-users/RecomendedFriendList.vue')
        },
        {
          path: '/messenger',
          name: 'messenger',
          component: () => import('../components/messenger/Messenger.vue')
        }
      ]
    }
  ]
})
