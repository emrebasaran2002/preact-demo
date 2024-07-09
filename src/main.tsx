import { render } from 'preact'
import './index.css'

const root = document.getElementById('app') as HTMLDivElement
render(<p>Hello World!</p>, root)
