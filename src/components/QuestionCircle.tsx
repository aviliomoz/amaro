type Props = {
    description?: string;
}

export const QuestionCircle = ({ description }: Props) => {
    return <span title={description} className="bg-stone-300 cursor-help text-white flex items-center justify-center size-4 font-medium rounded-full text-[10px]">?</span>
}