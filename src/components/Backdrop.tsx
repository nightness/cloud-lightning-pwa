import './components.css'

interface Props {
    onClick?: () => any
}

export const Backdrop = ({ onClick }: Props) => {
    return <div className='backdrop' onClick={onClick} />;
}

export default Backdrop