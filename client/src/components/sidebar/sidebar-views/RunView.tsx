import { useRunCode } from "@/context/RunCodeContext"
import useResponsive from "@/hooks/useResponsive"
import { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { LuCopy } from "react-icons/lu"
import { PiCaretDownBold } from "react-icons/pi"

function RunView() {
    const { viewHeight } = useResponsive()
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
    } = useRunCode()

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = JSON.parse(e.target.value)
        setSelectedLanguage(lang)
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output)
        toast.success("Output copied to clipboard")
    }

    return (
        <div
            className="flex flex-col items-center gap-2 overflow-hidden bg-dark p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Run Code</h1>
            <div className="flex h-[90%] w-full flex-col items-end gap-2 overflow-auto md:h-[92%]">
                <div className="relative w-full">
                    <select
                        className="w-full rounded-md border border-darkHover bg-darkHover px-4 py-2 text-white outline-none transition-colors hover:bg-[#4a4d55] focus:border-primary focus:ring-1 focus:ring-primary"
                        value={JSON.stringify(selectedLanguage)}
                        onChange={handleLanguageChange}
                    >
                        {supportedLanguages
                            .sort((a, b) => (a.language > b.language ? 1 : -1))
                            .map((lang, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={JSON.stringify(lang)}
                                    >
                                        {lang.language +
                                            (lang.version
                                                ? ` (${lang.version})`
                                                : "")}
                                    </option>
                                )
                            })}
                    </select>
                    <PiCaretDownBold
                        size={16}
                        className="absolute bottom-3 right-4 z-10 text-white"
                    />
                </div>
                <textarea
                    className="min-h-[120px] w-full resize-none rounded-md border border-darkHover bg-darkHover p-2 text-white outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Write you input here..."
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="flex w-full justify-center rounded-md bg-primary p-2 font-bold text-black outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={runCode}
                    disabled={isRunning}
                >
                    Run
                </button>
                <label className="flex w-full justify-between">
                    Output :
                    <button onClick={copyOutput} title="Copy Output">
                        <LuCopy
                            size={18}
                            className="cursor-pointer text-white"
                        />
                    </button>
                </label>
                <div className="w-full flex-grow resize-none overflow-y-auto rounded-md border border-darkHover bg-darkHover p-2 text-white outline-none font-mono text-sm">
                    <code>
                        <pre className="text-wrap whitespace-pre-wrap">{output}</pre>
                    </code>
                </div>
            </div>
        </div>
    )
}

export default RunView
