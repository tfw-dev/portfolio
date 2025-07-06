"use client"

import { useEffect, useRef, useState} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useOverlayRefs } from "@/context/RefContext";
import NavigationLink from "../components/navigation-links";
import { navItems } from "@/lib/navConfig";
import { TextPlugin } from "gsap/TextPlugin";


export default function ContactOverlay({handle}) {

   const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (loading || submitted) return; // 🔒 Prevent multiple submissions

  setLoading(true); // 🔄 Set loading state

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      console.error("Submission failed.");
    }
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    setLoading(false); // ✅ Reset loading state
  }
};




  
  const { containerRef, contentRef,  } = useOverlayRefs();

  const pathname = usePathname(); // e.g. "/about"

  const { navRefs } = useOverlayRefs();

  const item = navItems.find(item => item["handle"] == handle)
  gsap.registerPlugin(TextPlugin);

  const navCopy = useRef(null)
  const barCodeText = useRef(null)

  
  const refs = navRefs.current[handle];
  const lineRef = refs?.lineRef;
  const dotRef = refs?.dotRef;
  useEffect(() => {


  console.log(barCodeText)
  //replaces yourElement's text with "This is the new text" over the course of 2 seconds
  gsap.to(barCodeText.current, {
    delay: 2, // delay in seconds
    duration: 1,
    text: "Lets Connect",
    ease: "none",
  });


    const delay = window.scrollY === 0 ? 0 : 10;
  console.log(delay)
    if (containerRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        containerRef.current,
        { backdropFilter: "blur(0px)" },
        { backdropFilter: "blur(15px)", duration: 0.6, ease: "power2.out" },
        "<"
      )
      .fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1 },
        "<"
      )
      .fromTo(
        lineRef.current,
        { opacity: 0 },
        { opacity: 1 },
        "<"
      )
      .fromTo(
        dotRef.current,
        { opacity: 0 },
        { opacity: 1 },
        "<"
      )
    }
  }, []);

  useEffect(() => {
  if (submitted) {
    const timeout = setTimeout(() => {
      setForm({ firstName: '', lastName: '', company: '', email: '', message: '' });
    }, 5000); // clears form after 5s

    return () => clearTimeout(timeout);
  }
}, [submitted]);

  return (
    <div>
      <div className="antialiased opacity-0 font-barcode-tfb text-muted text-[52px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " ref={barCodeText} >
        Hello
      </div>
              <NavigationLink ref={navCopy}
              key={item.handle}
              label={item.label}
              handle={item.handle}
              number={item.number}
              className={item.className}
              dotOffsetMobile={item.dotOffsetMobile}
              dotOffsetDesktop={item.dotOffsetDesktop}
              reference={navCopy}
            />
    <div  className={`${ pathname === "/contact" ? "absolute" : "fixed"} opacity-0 overlay scroll top top-1/2 left-0 bot-0 w-full mask-size`} ref={containerRef}>
    
          <div className=" px-10 my-0  mt-[250px] text-left w-3/4 max-w-[600px] mx-auto " ref={contentRef}>
          <section className="!mb-90 relative flex flex-col gap-8 z-6 ">
                 {submitted ? (
              <p className="mx-auto relative md:top-[5vh] text-center">Thank you {form.firstName}<br></br><span>I’ll follow up shortly</span></p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div className="flex justify-between gap-4 w-full">
                  <div className="inputWrapper relative w-full">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full p-2"
                      required
                    />
                  </div>
                  <div className="inputWrapper relative w-full">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full p-2"
                      required
                    />
                  </div>
                </div>
                <div className="inputWrapper relative w-full">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full p-2 d"
                    required
                  />
                </div>
                <div className="inputWrapper relative w-full">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 d"
                    required
                  />
                </div>
                <div className="inputWrapper relative">
                  <textarea
                    name="message"
                    placeholder="Your message"
                    value={form.message}
                    onChange={handleChange}
                    className="relative w-full p-3  h-32"
                    required
                  />
                </div>
                <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
              </form>
                )}
            </section>
  
        </div>
    </div>
    </div>
  );
}