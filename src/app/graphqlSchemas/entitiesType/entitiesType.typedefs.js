const typeDef = `
type EntitiesType {
  key: String!
  name: String
  numberOfEntities: Int
  state: String
  properties: [KeyVal]
}

type KeyVal {
  key: String
  type: String
  label: String
  description: String
  prefix: String
  suffix: String
  required: Boolean
  template: String
  multipleValues: Boolean
  trialField: Boolean
  value: String
  defaultValue: String
  defaultProperty: Boolean
}

extend type Query {
  entitiesTypes(experimentId:String!): [EntitiesType]
}

extend type Mutation {
  addUpdateEntitiesType(
    key: String!,
    experimentId: String!,
    uid: String!,
    name: String,
    numberOfEntities: Int,
    state: String,
    properties: [KeyValInput]
    action: String
  ): EntitiesType
}

input KeyValInput {
  key: String
  type: String
  label: String
  description: String
  prefix: String
  suffix: String
  required: Boolean
  template: String
  multipleValues: Boolean
  trialField: Boolean
  value: String
  defaultValue: String
  defaultProperty: Boolean
}

extend type Subscription {
  entitiesTypesUpdated: Boolean!
}
`;
module.exports = typeDef;
