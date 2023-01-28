
export const Input = (props) => {
    return(
        <div className="flex flex-col">
            <label className="text-base font-semibold text-gray-600">{props.label}</label>
            <input className={`${props.style} mt-2 bg-gray-100 px-4 py-2 font-medium rounded-lg text-gray-500 transition duration-700 focus:outline-none focus:border-2 focus:border-indigo-700 focus:text-black` } name={props.name} type={props.type} accept={props.accept} value={props.value} onChange={props.onChange} disabled={props.disabled}/>
        </div>
    )
}