"use client"

import { useEffect, useRef, useState} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useOverlayRefs } from "@/context/RefContext";
import NavigationLink from "../components/navigation-links";
import { navItems } from "@/lib/navConfig";
import { TextPlugin } from "gsap/TextPlugin";


export default function ContactOverlay({handle}) {

   const [form, setForm] = useState({ name: '', email: '', message: '' })

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
      setForm({ name: '', email: '', message: '' });
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

  return (
    <div>
      
      <div className="antialiased font-barcode-tfb text-muted text-[52px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " ref={barCodeText} >
        Hello
      </div>
    <div  className={`${ pathname === "/contact" ? "absolute" : "fixed"} opacity-0 overlay scroll top top-1/2 left-0 bot-0 w-full mask-size`} ref={containerRef}>
          <section className="!mb-90 relative flex flex-col gap-8 z-6 top-70 w-3/4 mx-auto">
                 {submitted ? (
              <p className="text-green-600">Thanks! I’ll get back to you soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded h-32"
                  required
                />
                <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
              </form>
                )}
            </section>
            </div>
        <div className=" px-10 my-0  mt-[250px] text-left" ref={contentRef}>
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
        </div>
    </div>
  );
}