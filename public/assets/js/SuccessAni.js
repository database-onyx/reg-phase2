const SuccessAni = gsap.timeline({
  ease: "bounce.out",
});

SuccessAni.fromTo(
  "#successcircle",
  {
    strokeDasharray: "1530px",
    strokeDashoffset: "1530px",
  },
  {
    duration: 1.2,

    strokeDashoffset: 0,
    strokeWidth: 10,
  }
);
SuccessAni.fromTo(
  "#innerSuccessCircle",
  {
    scale: 0,
    transformOrigin: "center",
  },
  {
    scale: 1.5,
  }
);
SuccessAni.fromTo(
  "#successTick",
  {
    strokeDasharray: "1530px",
    strokeDashoffset: "1530px",
  },
  {
    strokeDashoffset: 0,
  },
  "<"
);
SuccessAni.fromTo(
  "#bigstar",
  {
    scale: 0,
    transformOrigin: "center",
  },
  {
    scale: 1,
    strokeWidth: 18,
  }
);
SuccessAni.fromTo(
  "#rightstar",
  {
    scale: 0,
    transformOrigin: "center",
  },
  {
    scale: 1,
  }
);
SuccessAni.fromTo(
  "#bottomrightstar",
  {
    scale: 0,
    transformOrigin: "center",
  },
  {
    scale: 1,
  },
  "<"
);

var c = document.getElementById("canv");
var $ = c.getContext("2d");

var col = function (x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $.fillRect(x, y, 1, 1);
};
var R = function (x, y, t) {
  return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
};

var G = function (x, y, t) {
  return Math.floor(
    192 +
      64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
  );
};

var B = function (x, y, t) {
  return Math.floor(
    192 +
      64 *
        Math.sin(
          5 * Math.sin(t / 9) +
            ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
        )
  );
};

var t = 0;
var x;
var y;

var run = function () {
  for (x = 0; x <= 35; x++) {
    for (y = 0; y <= 35; y++) {
      col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
    }
  }
  t = t + 0.12;
  window.requestAnimationFrame(run);
};

run();
