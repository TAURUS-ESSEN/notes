import { LABEL_COLOR_CLASSES } from "../constants/labelColors"

export default function ColorPicker({labelColor, setLabelColor}) {

    return (
        <>
        <label className={`mr-2 px-2 py-1 ${LABEL_COLOR_CLASSES['amber']} rounded-sm`}>
            <input type="radio" name="color" onChange={(e)=>setLabelColor(e.target.value)} value="amber" checked={labelColor === 'amber'}/> 
        </label>
        <label className={`mr-2 px-2 py-1 ${LABEL_COLOR_CLASSES['rose']} rounded-sm`}>
            <input type="radio" onChange={(e)=>setLabelColor(e.target.value)} name="color" value="rose" checked={labelColor === 'rose'}/> 
        </label>
        <label className={`mr-2  px-2 py-1 ${LABEL_COLOR_CLASSES['green']} rounded-sm`}>
            <input type="radio" onChange={(e)=>setLabelColor(e.target.value)} name="color" value="green" checked={labelColor === 'green'}/> 
        </label>
        <label className={`mr-2  px-2 py-1 ${LABEL_COLOR_CLASSES['blue']} rounded-sm`}>
            <input type="radio" onChange={(e)=>setLabelColor(e.target.value)} name="color" value="blue" checked={labelColor === 'blue'}/> 
        </label>
        <label className={`mr-2  px-2 py-1 ${LABEL_COLOR_CLASSES['purple']} rounded-sm`}>
            <input type="radio" onChange={(e)=>setLabelColor(e.target.value)} name="color" value="purple" checked={labelColor === 'purple'}/> 
        </label>
        <label className={`mr-2  px-2 py-1 ${LABEL_COLOR_CLASSES['indigo']} rounded-sm`}>
            <input type="radio" onChange={(e)=>setLabelColor(e.target.value)} name="color" value="indigo" checked={labelColor === 'indigo'}/> 
        </label>
        </>
    )
}