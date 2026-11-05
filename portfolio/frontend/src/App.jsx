import Layout from './components/Layout.jsx'
import Particles from './components/Particles.jsx'
import { ProfileProvider } from './ProfileContext.jsx'

export default function App() {
  return (
    <ProfileProvider>
      <div className="bg-layer" aria-hidden="true">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="grid-overlay" />
      </div>
      <Particles />
      <Layout />
    </ProfileProvider>
  )
}
