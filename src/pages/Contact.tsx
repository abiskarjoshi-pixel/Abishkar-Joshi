import { useState, type FormEvent } from 'react'
import RevealOnScroll from '../components/RevealOnScroll'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  useSEO({
    title: 'Contact',
    description: 'Book Abishkar Joshi for weddings, editorial, portrait, film, and design projects across Nepal and South Asia.',
    url: '/contact',
  })
  const [state, setState] = useState<FormState>('idle')
  const [values, setValues] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })

  const update = (field: string, value: string) =>
    setValues((v) => ({ ...v, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('https://formspree.io/f/xpzgknok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (res.ok) {
        setState('success')
        setValues({ name: '', email: '', projectType: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(33,29,24,0.2)',
    padding: '0.75rem 0',
    color: 'var(--ink)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'var(--terracotta)',
    marginBottom: '0.5rem',
  }

  return (
    <div style={{ backgroundColor: 'var(--bone)', fontFamily: 'var(--font-body)' }}>
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <RevealOnScroll>
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            {/* Left */}
            <div>
              <div className="w-8 h-px mb-6" style={{ background: 'var(--terracotta)' }} />
              <h1
                className="font-light mb-8"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                  color: 'var(--ink)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                Let's<br /><em>talk</em>
              </h1>
              <p className="text-sm leading-relaxed mb-10" style={{ color: 'rgba(33,29,24,0.65)', maxWidth: '38ch' }}>
                Available for weddings, editorial commissions, brand work, and documentary projects across Nepal and South Asia.
                Response within 24 hours.
              </p>

              <div className="space-y-5">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Email</p>
                  <a
                    href="mailto:hello@abishkarjoshi.com"
                    className="text-sm nav-link"
                    style={{ color: 'var(--ink)' }}
                  >
                    hello@abishkarjoshi.com
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Instagram</p>
                  <a
                    href="https://instagram.com/abishkarjoshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm nav-link"
                    style={{ color: 'var(--ink)' }}
                  >
                    @abishkarjoshi
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Behance</p>
                  <a
                    href="https://behance.net/abishkarjoshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm nav-link"
                    style={{ color: 'var(--ink)' }}
                  >
                    behance.net/abishkarjoshi
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              {state === 'success' ? (
                <div className="flex flex-col justify-center h-full py-16">
                  <div className="w-8 h-px mb-8" style={{ background: 'var(--gold)' }} />
                  <h2
                    className="font-light mb-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                      color: 'var(--ink)',
                    }}
                  >
                    Message received.
                  </h2>
                  <p className="text-sm" style={{ color: 'rgba(33,29,24,0.6)' }}>
                    I'll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={values.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderBottomColor = 'var(--terracotta)' }}
                      onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(33,29,24,0.2)' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderBottomColor = 'var(--terracotta)' }}
                      onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(33,29,24,0.2)' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" style={labelStyle}>Project Type</label>
                    <select
                      id="projectType"
                      required
                      value={values.projectType}
                      onChange={(e) => update('projectType', e.target.value)}
                      style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                      onFocus={(e) => { e.target.style.borderBottomColor = 'var(--terracotta)' }}
                      onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(33,29,24,0.2)' }}
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Fashion">Fashion / Editorial</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Film">Film</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={values.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell me about your project…"
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={(e) => { e.target.style.borderBottomColor = 'var(--terracotta)' }}
                      onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(33,29,24,0.2)' }}
                    />
                  </div>

                  {state === 'error' && (
                    <p className="text-xs" style={{ color: 'var(--terracotta)' }}>
                      Something went wrong. Please try emailing directly at hello@abishkarjoshi.com
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="text-xs tracking-[0.2em] uppercase px-8 py-4 border transition-all duration-300 disabled:opacity-50"
                    style={{ borderColor: 'var(--terracotta)', color: 'var(--terracotta)', cursor: state === 'sending' ? 'wait' : 'pointer' }}
                    onMouseEnter={(e) => {
                      if (state !== 'sending') {
                        ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terracotta)'
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--cream)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--terracotta)'
                    }}
                  >
                    {state === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <Footer />
    </div>
  )
}
