import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import timeLineOptions from './timeLine';
import articlesOptions from './articles';
import categoryOptions from './category';
import tagsOptions from './tags';
import recommendOptions from './recommend';
import homeOptions from './home';
import opOptions from './options';
import userOptions from './user';

const store = new Vuex.Store({
    modules: {
        timeLineOptions,
        articlesOptions,
        categoryOptions,
        tagsOptions,
        recommendOptions,
        homeOptions,
        opOptions,
        userOptions,
    }
})

export default store