import BarChart from './BarChart';

export function countEventsByType(data) {
    const state = {
        comment: 0,
        commit: 0,
        openedIssue: 0,
        closedIssue: 0,
        openedMilestone: 0,
        closedMilestone: 0,
        destroyedMilestone: 0,
        openedMr: 0,
        approvedMr: 0,
        acceptedMr: 0,
        closedMr: 0,
        createdTag: 0,
        deletedTag: 0,
        createdBranch: 0,
        deletedBranch: 0
    };

    data.forEach(o => {
        if (o.action_name === 'commented on') {
            state.comment++;
        } else if (o.action_name === 'opened' && o.target_type === 'Issue') {
            state.openedIssue++;
        } else if (o.action_name === 'closed' && o.target_type === 'Issue') {
            state.closedIssue++;
        } else if (o.action_name === 'opened' && o.target_type === 'Milestone') {
            state.openedMilestone++;
        } else if (o.action_name === 'closed' && o.target_type === 'Milestone') {
            state.closedMilestone++;
        } else if (o.action_name === 'destroyed' && o.target_type === 'Milestone') {
            state.destroyedMilestone++;
        } else if (o.action_name === 'opened' && o.target_type === 'MergeRequest') {
            state.openedMr++;
        } else if (o.action_name === 'approved' && o.target_type === 'MergeRequest') {
            state.approvedMr++;
        } else if (o.action_name === 'accepted' && o.target_type === 'MergeRequest') {
            state.acceptedMr++;
        } else if (o.action_name === 'closed' && o.target_type === 'MergeRequest') {
            state.closedMr++;
        } else if (o.action_name === 'pushed new' && o.push_data.ref_type === 'tag') {
            state.createdTag++;
        } else if (o.action_name === 'deleted' && o.push_data.ref_type === 'tag') {
            state.deletedTag++;
        } else if (o.action_name === 'pushed new' && o.push_data.ref_type === 'branch') {
            state.createdBranch++;
        } else if (o.action_name === 'deleted' && o.push_data.ref_type === 'branch') {
            state.deletedBranch++;
        } else if (o.action_name === 'pushed to') {
            state.commit++;
        } else if (o.action_name === 'created' || o.action_name === 'joined' ||
            o.action_name === 'left'
        ) {
            // Not counting project/group create/join/leave events
        } else {
            console.warn('unrecognized event', o);
        }
    });

    return state;
}

function EventsByTypeChart({ data }) {
    const counts = countEventsByType(data);
    const options = {
        title: { text: 'Events by Type' },
        series: [
            {
                name: 'Counts',
                data: Object.keys(counts).map(k => [k, counts[k]])
            }
        ]
    };

    return (
        <BarChart options={options} />
    );
}

export default EventsByTypeChart;
