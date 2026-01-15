import { ChangeEvent } from "react"
import { PiCaretDownBold } from "react-icons/pi"

interface SelectProps {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    value: string
    options: string[]
    title: string
}

function Select({ onChange, value, options, title }: SelectProps) {
    return (
        <div className="relative w-full">
            <label className="mb-2 block text-sm font-medium text-white">{title}</label>
            <select
                className="w-full rounded-md border border-darkHover bg-darkHover px-4 py-2 text-white outline-none transition-colors hover:bg-[#4a4d55] focus:border-primary focus:ring-1 focus:ring-primary"
                value={value}
                onChange={onChange}
            >
                {options.sort().map((option) => {
                    const value = option
                    const name =
                        option.charAt(0).toUpperCase() + option.slice(1)

                    return (
                        <option key={name} value={value}>
                            {name}
                        </option>
                    )
                })}
            </select>
            <PiCaretDownBold
                size={16}
                className="pointer-events-none absolute bottom-3 right-4 z-10 text-white"
            />
        </div>
    )
}

export default Select
