import { QuestionCircle } from "../QuestionCircle"

export const Form = ({ children }: { children: React.ReactNode }) => {
    return <form noValidate className="flex flex-col gap-5 h-fit">
        {children}
    </form>
}

Form.Field = ({ children, title, description, filters }: { children: React.ReactNode, title: string, description?: string, filters?: React.ReactNode[] }) => {
    return <div className="flex flex-col gap-1 w-full">
        <div className="text-sm font-semibold flex justify-between gap-2">
            <div className="flex items-center gap-2">
                {title}
                {description && <QuestionCircle description={description} />}
            </div>
            {filters && filters}
        </div>
        {children}
    </div>
}

Form.NumericInput = ({ value, onChange, symbol, symbolPosition = "left", disabled = false, max = undefined }: { value: number, onChange?: (value: number) => void, symbol?: string, symbolPosition?: "left" | "right", disabled?: boolean, max?: number }) => {
    return <div className="flex items-center gap-2 w-full">
        {symbol && symbolPosition === "left" && <span>{symbol}</span>}
        <input min={0} max={max} disabled={disabled} type="number" value={disabled ? value.toLocaleString("es-PE", { maximumFractionDigits: 2 }) : value} onChange={onChange ? (e) => onChange(e.target.valueAsNumber) : () => { }} className="border rounded-md px-3 py-1.5 focus:outline-double focus:outline-stone-300 text-sm w-full" />
        {symbol && symbolPosition === "right" && <span className="text-sm">{symbol}</span>}
    </div>
}

Form.TextInput = ({ value, onChange, placeholder = "" }: { value: string, onChange: (value: string) => void, placeholder?: string }) => {
    return <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full flex border rounded-md px-3 py-1.5 focus:outline-double focus:outline-stone-300 text-sm" />
}

Form.Checkbox = ({ value, onChange, label }: { value: boolean, onChange: (value: boolean) => void, label: string }) => {
    return <label className="font-medium cursor-pointer flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="cursor-pointer" />
        {label}
    </label>
}

Form.Select = ({ value, onChange, options }: { value: string, onChange: (value: string) => void, options: { label: string, value: string }[] }) => {
    return <select value={value} onChange={(e) => onChange(e.target.value)} className="border rounded-md px-3 py-1.5 focus:outline-double focus:outline-stone-300 text-sm">
        {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
}

Form.Separator = () => {
    return <div className="w-full h-0 border-dashed my-1 border-b"></div>
}

