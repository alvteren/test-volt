import { default as createRouter5 } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import listenersPlugin from 'router5-plugin-listeners';

import layoutStore from '../Layout/stores/layout';

const dataMiddlewareFactory = routes => () => toState => {
  const route = routes.find(route => route.name === toState.name);

  if (route) {
    layoutStore.setLoading(true);
    const promises = [Promise.resolve(route.component())];
    if (route.onActivate) {
      // need for when onActivate throw error that view dosen't loose
      const routeActivate = new Promise(resolve =>
        route
          .onActivate(toState.params)
          .then(resolve)
          .catch(error => resolve({ error }))
      );
      promises.push(routeActivate);
    }
    if (route.title) {
      document.title = route.title;
    }

    return Promise.all(promises)
      .then(([component, data]) => {
        layoutStore.setLoading(false);
        return {
          ...toState,
          component: component.default || component,
          data
        };
      })
      .catch(error => {
        layoutStore.setLoading(false);
        console.log(error);
      });
  }

  return toState;
};

const transitionMiddleware = () => toState => {
  window.scrollTo(0, 0);
  return toState;
};

export function createRouter(routes) {
  const router = createRouter5(routes, {
    allowNotFound: true,
    queryParamsMode: 'loose'
  });
  router.usePlugin(
    browserPlugin({
      useHash: false
    })
  );
  router.usePlugin(listenersPlugin());

  router.useMiddleware(dataMiddlewareFactory(routes));
  router.useMiddleware(transitionMiddleware);

  router.start();
  return router;
}
