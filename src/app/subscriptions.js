const PubSub = require('graphql-subscriptions').PubSub;
const DEVICES_UPDATED = 'DEVICES_UPDATED';
const TRIALS_UPDATED = 'TRIALS_UPDATED';
const ASSETS_UPDATED = 'ASSETS_UPDATED';
const TRIALSETS_UPDATED = 'TRIALSETS_UPDATED';
const EXPERIMENTS_UPDATED = 'EXPERIMENTS_UPDATED';
const DATAS_UPDATED = 'DATAS_UPDATED';
module.exports = { pubsub: new PubSub(), DEVICES_UPDATED, TRIALS_UPDATED, ASSETS_UPDATED, TRIALSETS_UPDATED, EXPERIMENTS_UPDATED, DATAS_UPDATED }
