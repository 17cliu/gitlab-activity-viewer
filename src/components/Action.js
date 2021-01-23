
function Action(props) {
    let sentence;
    const date = new Date(props.created_at).toLocaleString();

    if (props.push_data) {
        const destinationTitle = props.push_data.commit_title
            ? `"${props.push_data.commit_title}"`
            : null;
        sentence = `${props.action_name} ${props.push_data.ref_type} ` +
            `${props.push_data.ref} ${destinationTitle} on ${date}`;
    } else if (props.note) {
        sentence = `${props.action_name} ${props.note?.noteable_type} ` +
            `"${props.target_title}" on ${date}`;
    } else {
        sentence = `${props.action_name} ${props.target_type} ` +
            `"${props.target_title}" on ${date}`;
    }

    return (
        <li className="action">
            {sentence}
        </li>
    );
}

export default Action;
