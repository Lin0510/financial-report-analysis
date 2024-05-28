/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// firebase.d.ts
declare module '@/services/firebase.js' {
  import { FirebaseApp } from 'firebase/app';
  import { Analytics } from 'firebase/analytics';

  export const setupFirebase: FirebaseApp;
  export const analyticsFirebase: Analytics;
}
