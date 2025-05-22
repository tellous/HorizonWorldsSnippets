import { Component, PropTypes, CodeBlockEvents, ProjectileLauncherGizmo } from 'horizon/core';

class ProjectileLauncher extends Component<typeof ProjectileLauncher> {
    static propsDefinition = {
        projectileLauncher: { type: PropTypes.Entity },
    };

    private projectileLauncher?: ProjectileLauncherGizmo;

    preStart() {
        this.projectileLauncher = this.props.projectileLauncher?.as(ProjectileLauncherGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnIndexTriggerDown,
            this.onTriggerDown.bind(this)
        );
    }

    start() {}

    onTriggerDown() {
        if (this.projectileLauncher) {
            this.projectileLauncher.launch();
        }
    }
}

Component.register(ProjectileLauncher);
