export const Badge = (props) => {
    return (
        <span className={`${props.style} transition rounded-full  leading-none duration-700 py-1 px-2 cursor-default`}>
            {props.text}
        </span>
    );
  };
  