import { Loader } from 'lucide-react'

function Spinner({ size = 24 }: { size?: number }) {
    return (
        <span className="animate-[spin_3s_linear_infinite]"><Loader size={size} /></span>
    )
}

export default Spinner