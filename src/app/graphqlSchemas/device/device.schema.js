const { property, merge } = require('lodash');
const { pubsub, ENTITIES_UPDATED } = require('../../subscriptions');
const deviceTypeDefs = require('./device.typedefs');

const typeResolver = {
  Device: {
    name: property('custom.data.name'),
    key: property('custom.data.key'),
    deviceTypeKey: property('custom.data.deviceTypeKey'),
    state: property('custom.data.state'),
    properties: property('custom.data.properties'),
  },
/*  DeviceKeyVal: {
    val: property('val'),
    key: property('key'),
    type: property('type'),
    id: property('id'),
    label: property('label'),
    description: property('description'),
    prefix: property('prefix'),
    suffix: property('suffix'),
    required: property('required'),
    template: property('template'),
    multipleValues: property('multipleValues'),
    trialField: property('trialField'),
  }, */
};

const resolvers = {
  Query: {
    async entities(_, args, context) {
      return context.device.getDevices(args, context);
    },
  },
  Mutation: {
    async addUpdateEntity(_, args, context) {
      pubsub.publish(ENTITIES_UPDATED, { devicesUpdated: true });
      return context.device.addUpdateEntity(args, context);
    },
  },
  Subscription: {
    devicesUpdated: {
      subscribe: () => pubsub.asyncIterator(ENTITIES_UPDATED),
    },
  },
};

const deviceResolvers = merge(typeResolver, resolvers);

module.exports = {
  deviceTypeDefs,
  deviceResolvers,
};
