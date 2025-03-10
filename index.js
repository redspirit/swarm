import { promisify } from 'util';
import Docker from 'dockerode';

class DockSwarm {
    constructor(conf) {
        this.socketPath = conf.socketPath || '/var/run/docker.sock';
        this.authconfig = {
            username: conf.username || '',
            password: conf.password || '',
            // auth: conf.auth || '',
            serveraddress: conf.serveraddress || '',
        };

        this.docker = new Docker({ socketPath: this.socketPath });
        this.followProgressPromise = promisify(this.docker.modem.followProgress);
    }

    async pullImage(imageName) {
        let stream = await this.docker.pull(imageName, { authconfig: this.authconfig });
        return this.followProgressPromise(stream);
    }

    async updateServiceImage(serviceName, newImageName) {
        const services = await this.docker.listServices();
        const serviceInfo = services.find((service) => service.Spec.Name === serviceName);
        if (!serviceInfo) throw new Error(`Service with name "${serviceName}" not found.`);

        const service = this.docker.getService(serviceInfo.ID);

        // Обновляем сервис с новым образом
        const updateOptions = {
            version: serviceInfo.Version.Index,
            authconfig: this.authconfig,
            ...serviceInfo.Spec,
             TaskTemplate: {
                ...serviceInfo.Spec.TaskTemplate,
                ContainerSpec: {
                    ...serviceInfo.Spec.TaskTemplate.ContainerSpec,
                    Image: newImageName,
                },
            },
        };
        return service.update(updateOptions);
    }
}

export default DockSwarm;
