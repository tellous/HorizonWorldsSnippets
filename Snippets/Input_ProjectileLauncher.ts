import * as hz from 'horizon/core';

class ProjectileLauncher extends hz.Component<typeof ProjectileLauncher> {
    static propsDefinition = {
        projectileLauncher: { type: hz.PropTypes.Entity },
    };

    private projectileLauncher?: hz.ProjectileLauncherGizmo;

    start() {
        this.projectileLauncher = this.props.projectileLauncher?.as(hz.ProjectileLauncherGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnIndexTriggerDown,
            this.onTriggerDown.bind(this)
        );
    }

    onTriggerDown() {
        if (this.projectileLauncher) {
            this.projectileLauncher.launch();
        }
    }
}

hz.Component.register(ProjectileLauncher);
