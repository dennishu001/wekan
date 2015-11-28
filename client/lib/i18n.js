// We save the user language preference in the user profile, and use that to set
// the language reactively. If the user is not connected we use the language
// information provided by the browser, and default to english.

Tracker.autorun(() => {
  const currentUser = Meteor.user();
  let language;
  if (currentUser) {
    language = currentUser.profile && currentUser.profile.language;
  } else {
    language = navigator.language || navigator.userLanguage;
  }
  // set default to zh-CN
  if (!language) language = 'zh-CN';

  if (language) {
    TAPi18n.setLanguage(language);

    // XXX T9n implementaion of language code is rather inconsistent. 
    // What concerns us here: zh_cn, zh_hk, zh_tw
    const shortLanguage = language.split('-')[0];
    const T9nLanguage = language.replace('-', '_').toLowerCase();
    T9n.setLanguage(T9nLanguage);
  }
});
