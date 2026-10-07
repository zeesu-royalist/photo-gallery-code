"use client";

import { useEffect, type CSSProperties } from "react";
import { initArchive } from "@/lib/archive";

let started = false;

export default function Archive() {
  useEffect(() => {
    if (started) return; // guard against React strict-mode double effects
    started = true;
    initArchive();
  }, []);

  return (
    <>
<div id="scrolltrack"></div>
<div id="stage"><div id="world"><div id="orb"></div><h1 id="headline"><span className="inner"><span style={{ "--i": 0 } as CSSProperties}>I</span> <span style={{ "--i": 1 } as CSSProperties}>See</span> <span style={{ "--i": 2 } as CSSProperties}>Through</span> <span style={{ "--i": 3 } as CSSProperties}>the</span> <span style={{ "--i": 4 } as CSSProperties}>Wild</span></span></h1></div></div>
<div className="vig"></div>
<div id="grid"><div className="rows" id="rows"></div></div>
<header className="chrome">
<a className="wordmark" href="#" aria-label="Ethan Vale">Ethan<em>Vale</em></a>
<button className="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span className="menu-label">Menu</span><span className="bars"><i></i><i></i></span></button>
</header>
<div className="bio chrome"><div className="who">{/* eslint-disable-next-line @next/next/no-img-element */}
<img id="avatar" alt="Ethan Vale" /><b>Ethan Vale</b></div><p>Wildlife photography is less about taking pictures and more about learning when not to move. Every frame in this archive was captured in natural conditions without intervention.</p></div>
<div className="colophon chrome">Field Notes 2026</div>
<button className="gridbtn chrome" id="gridBtn" aria-label="Toggle grid view"><b></b><b></b><b></b><b></b></button>
<div className="cue chrome"><s></s>Drag to rotate</div>
<div id="menu"><nav><a href="#" data-grid>The Archive</a><a href="#" data-close-menu>Field Notes</a><a href="#" data-close-menu>Studio</a><a href="#" data-close-menu>Contact</a></nav><div className="addr">Nairobi · Cape Town · Reykjavík<br />studio@ethanvale.photo</div></div>
<div id="lit"><div className="scrim" data-close></div><div className="plate" id="plate"><div className="shot"><img id="litImg" alt="" /><button className="close" data-close>Close</button></div><div className="meta"><div><h2 id="litTitle"></h2><div className="where" id="litWhere"></div></div><p className="note" id="litNote"></p></div></div></div>
<div id="intro"><div className="fallback"></div><video id="film" muted playsInline autoPlay preload="auto" disablePictureInPicture src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_195107_ed3f055a-3a13-4a71-b743-e10310454246.mp4"></video><div className="veil"></div><button className="skip" id="skip">Skip</button></div>
<div id="splash"><div className="mark">Ethan<em>Vale</em></div><div className="bar"><s id="bar"></s></div><div className="tag">Field Notes 2026</div></div>
<div id="dot"></div>
    </>
  );
}
