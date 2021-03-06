const config = require('../../../config');

class Experiment {
  constructor({ connector }) {
    this.connector = connector;
  }

  async getAllExperiments() {
    let projects = await this.connector.getAllProjects();
    projects = projects.filter(
      project => project.id !== config.devicesProjectId,
    );
    return projects;
  }

  async getAllExperimentsWithData() {
    return this.connector.getTasks(
      experiment => experiment.custom
        && experiment.custom.type === 'experimentData'
        && experiment.recycled === undefined
        && experiment.project
        && experiment.project.recycled === undefined
        && experiment.custom.data.state !== 'Deleted',
    );
  }

  async addUpdateExperiment(args) {
    const { uid, name, description, state, status, id } = args;

    const newExperiment = {
      custom: {
        id,
      },
      title: name,
      description,
    };
    if (state === 'Deleted') newExperiment.recycled = new Date().toDateString();
    if (state) newExperiment.status = status;
    const response = await this.connector.addUpdateProject(newExperiment, uid);
    return response ? response.data : null;
  }

  async buildExperimentData(args, context) {
    const { uid, id } = args;
    const tasks = await this.connector.getTasksFromExperiment(
      id.split('_')[0],
      task => task.custom && task.custom.type === 'trial' && task.custom.id === id,
    );
    const devices = tasks[0].custom.data.devices
      ? tasks[0].custom.data.devices.map(d => ({
        Name: d.name,
        Type: d.type,
        attributes: d.properties
          ? d.properties.reduce(
            (obj, item) => Object.assign(obj, { [item.key]: item.val }),
            {},
          )
          : {},
        contains: [],
        entityType: 'DEVICE',
      }))
      : [];
    const res = {
      Entities: devices,
      properties: tasks[0].custom.data.properties
        ? tasks[0].custom.data.properties.reduce(
          (obj, item) => Object.assign(obj, { [item.key]: item.val }),
          {},
        )
        : {},
    };
    return true;
  }
}

module.exports = Experiment;
