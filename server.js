const http = require('http');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const os = require('os');
const https = require('https');
const PORT = process.env.PORT || 3000;
const HTML = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Max Porte — Gestionale</title>
<!-- MAXPORTE-BUILD-v02MAG2026 -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2">


</script>


<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --red:#D0201A;--red2:#b81c17;--dark:#1A1A1A;--mid:#5F5E5A;
  --beige:#F7F4EF;--border:#E2DDD6;--white:#ffffff;
  --green-bg:#eaf3de;--green-tx:#3b6d11;
  --amber-bg:#faeeda;--amber-tx:#854f0b;
  --red-bg:#fcebeb;--red-tx:#a32d2d;
  --blue-bg:#e6f1fb;--blue-tx:#185fa5;
  --gray-bg:#f1efe8;--gray-tx:#5f5e5a;
  --radius:8px;--radius-lg:12px;
}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--beige);color:var(--dark);font-size:14px;height:100vh;overflow:hidden}

/* LOGIN */
#login-screen{position:fixed;inset:0;background:var(--dark);display:flex;align-items:center;justify-content:center;z-index:1000}
.login-box{background:var(--white);border-radius:16px;padding:40px;width:380px;max-width:90vw}
.login-logo{display:flex;align-items:center;gap:14px;margin-bottom:32px}
.login-diamond{width:48px;height:48px;background:var(--dark);transform:rotate(45deg);border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.login-diamond-inner{transform:rotate(-45deg);text-align:center;line-height:1.1}
.login-diamond-inner span{display:block;font-weight:900;font-size:10px;letter-spacing:-0.5px}
.login-diamond-inner .m{color:#fff}.login-diamond-inner .ax{color:var(--red)}.login-diamond-inner .p{color:var(--red)}
.login-brand{font-size:22px;font-weight:700;letter-spacing:0.3px}
.login-brand span:first-child{color:var(--dark)}
.login-brand span:last-child{color:var(--red)}
.login-payoff{font-size:11px;color:var(--mid);letter-spacing:1px;text-transform:uppercase;margin-top:2px}
.login-title{font-size:16px;font-weight:500;margin-bottom:20px;color:var(--dark)}
.form-group{margin-bottom:14px}
.form-label{font-size:12px;color:var(--mid);margin-bottom:5px;display:block;text-transform:uppercase;letter-spacing:0.3px}
.form-input{width:100%;padding:10px 12px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:inherit;background:var(--beige);color:var(--dark);outline:none;transition:border 0.15s}
.form-input:focus{border-color:var(--red);background:var(--white)}
.login-btn{width:100%;padding:11px;background:var(--red);color:#fff;border:none;border-radius:var(--radius);font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;margin-top:4px;transition:background 0.15s}
.login-btn:hover{background:var(--red2)}
.login-error{background:var(--red-bg);color:var(--red-tx);border-radius:var(--radius);padding:9px 12px;font-size:13px;margin-bottom:12px;display:none}

/* APP */
#app{display:none;height:100vh;display:none;flex-direction:row}
#app.visible{display:flex}

/* SIDEBAR */
.sidebar{width:208px;min-width:208px;background:var(--dark);display:flex;flex-direction:column;height:100vh}
.sb-logo{padding:16px 14px 14px;border-bottom:0.5px solid rgba(255,255,255,0.08)}
.sb-diamond{width:36px;height:36px;background:var(--white);transform:rotate(45deg);border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sb-diamond-inner{transform:rotate(-45deg);text-align:center;line-height:1}
.sb-diamond-inner span{display:block;font-weight:900;letter-spacing:-0.5px}
.sb-diamond-inner .m{font-size:9px;color:var(--dark)}.sb-diamond-inner .ax{font-size:9px;color:var(--red)}.sb-diamond-inner .p{font-size:8px;color:var(--red)}
.sb-wordmark{display:flex;align-items:center;gap:10px}
.sb-name{font-size:15px;font-weight:700;letter-spacing:0.3px}
.sb-name span:first-child{color:#fff}.sb-name span:last-child{color:var(--red)}
.sb-payoff{font-size:9px;color:rgba(255,255,255,0.3);letter-spacing:1px;text-transform:uppercase;margin-top:2px}
.sb-section{font-size:9px;color:rgba(255,255,255,0.25);padding:14px 14px 4px;letter-spacing:1px;text-transform:uppercase}
.sb-item{display:flex;align-items:center;gap:9px;padding:7px 14px;cursor:pointer;font-size:13px;color:rgba(255,255,255,0.55);border-left:2px solid transparent;transition:all 0.1s;user-select:none}
.sb-item:hover{background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.85)}
.sb-item.active{background:rgba(208,32,26,0.12);color:#fff;border-left:2px solid var(--red)}
.sb-icon{width:14px;height:14px;flex-shrink:0;opacity:0.6}
.sb-item.active .sb-icon{opacity:1}
.sb-footer{margin-top:auto;padding:10px 14px;border-top:0.5px solid rgba(255,255,255,0.06)}
.sb-user{font-size:11px;color:rgba(255,255,255,0.3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sb-logout{font-size:11px;color:rgba(208,32,26,0.7);cursor:pointer;margin-top:2px}
.sb-logout:hover{color:var(--red)}

/* MAIN */
.main{flex:1;display:flex;flex-direction:column;overflow:visible;background:var(--beige)}
.topbar{padding:0 20px;height:50px;border-bottom:0.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--white);flex-shrink:0}
.topbar-title{font-size:15px;font-weight:500}
.topbar-bc{font-size:12px;color:var(--mid);margin-left:10px}
.content{flex:1;overflow-y:auto;padding:20px}

/* GRID/CARD */
.grid-4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:18px}
.grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-bottom:16px}
.metric{background:var(--white);border:0.5px solid var(--border);border-radius:var(--radius);padding:13px 15px}
.metric-label{font-size:11px;color:var(--mid);margin-bottom:5px;text-transform:uppercase;letter-spacing:0.3px}
.metric-value{font-size:22px;font-weight:500}
.metric-delta{font-size:11px;margin-top:3px;color:var(--mid)}
.card{background:var(--white);border:0.5px solid var(--border);border-radius:var(--radius-lg);padding:16px;margin-bottom:14px}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.card-title{font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.4px;color:var(--dark)}

/* TABLE */
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;padding:7px 9px;color:var(--mid);font-weight:400;border-bottom:0.5px solid var(--border);font-size:11px;text-transform:uppercase;letter-spacing:0.4px}
td{padding:8px 9px;border-bottom:0.5px solid var(--border);color:var(--dark);vertical-align:middle}
tr:last-child td{border-bottom:none}
tr.data-row:hover td{background:var(--beige);cursor:pointer}
.empty-row td{text-align:center;color:var(--mid);font-style:italic;padding:24px}

/* BADGE */
.badge{display:inline-block;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:500}
.bg{background:var(--green-bg);color:var(--green-tx)}
.ba{background:var(--amber-bg);color:var(--amber-tx)}
.br{background:var(--red-bg);color:var(--red-tx)}
.bb{background:var(--blue-bg);color:var(--blue-tx)}
.bgr{background:var(--gray-bg);color:var(--gray-tx)}
.tag{display:inline-block;padding:1px 7px;border-radius:4px;font-size:11px;background:rgba(208,32,26,0.08);color:var(--red);border:0.5px solid rgba(208,32,26,0.2)}

/* BUTTONS */
.btn{padding:6px 14px;border-radius:var(--radius);border:0.5px solid var(--border);background:var(--white);color:var(--dark);cursor:pointer;font-size:13px;font-family:inherit;transition:all 0.1s}
.btn:hover{background:var(--beige)}
.btn-red{background:var(--red);border-color:var(--red);color:#fff}
.btn-red:hover{background:var(--red2)}
.btn-sm{padding:4px 10px;font-size:12px}

/* FORM */
.form-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);z-index:500;display:none;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;box-sizing:border-box}
.form-overlay.open{display:flex;flex-wrap:wrap}
#modal-cfg{z-index:600;background:rgba(0,0,0,0.75)}
.form-modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);z-index:1000;display:none;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;box-sizing:border-box}.form-modal-overlay.open{display:flex;flex-wrap:wrap}.form-modal{background:var(--white);border-radius:var(--radius-lg);width:100%;max-width:680px;overflow:hidden;margin:auto;box-sizing:border-box}
.form-modal-head{padding:16px 20px;border-bottom:0.5px solid var(--border);display:flex;justify-content:space-between;align-items:center;background:var(--dark)}
.form-modal-title{font-size:15px;font-weight:500;color:#fff}
.form-close{background:none;border:none;color:rgba(255,255,255,0.5);font-size:20px;cursor:pointer;line-height:1;padding:0 4px}
.form-close:hover{color:#fff}
.form-modal-body{padding:20px}
.form-section{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.6px;color:var(--mid);margin:16px 0 8px;padding-bottom:4px;border-bottom:0.5px solid var(--border)}
.form-section:first-child{margin-top:0}
.form-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:8px}
.form-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:8px}
.form-field{display:flex;flex-direction:column;gap:4px}
.form-field label{font-size:11px;color:var(--mid);text-transform:uppercase;letter-spacing:0.3px}
.form-field label .req{color:var(--red);margin-left:2px}
.form-field input,.form-field select,.form-field textarea{padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit;background:var(--beige);color:var(--dark);outline:none;transition:border 0.15s}
.form-field input:focus,.form-field select:focus,.form-field textarea:focus{border-color:var(--red);background:var(--white)}
.form-field textarea{resize:vertical;min-height:70px}
.form-field .err{font-size:11px;color:var(--red);display:none}
.form-field.invalid input,.form-field.invalid select{border-color:var(--red)}
.form-field.invalid .err{display:block}
.form-modal-foot{padding:14px 20px;border-top:0.5px solid var(--border);display:flex;justify-content:flex-end;gap:10px}
.form-tabs{display:flex;gap:0;margin-bottom:16px;border:0.5px solid var(--border);border-radius:var(--radius);overflow:hidden;width:fit-content}
.form-tab{padding:6px 16px;font-size:13px;cursor:pointer;color:var(--mid);background:var(--beige);border-right:0.5px solid var(--border);transition:all 0.1s}
.form-tab:last-child{border-right:none}
.form-tab.active{background:var(--red);color:#fff;font-weight:500}
.section-hidden{display:none}

/* TOAST */
.toast{position:fixed;bottom:24px;right:24px;background:var(--dark);color:#fff;padding:12px 18px;border-radius:var(--radius);font-size:13px;z-index:9999;opacity:0;transform:translateY(10px);transition:all 0.25s;pointer-events:none}
.toast.show{opacity:1;transform:translateY(0)}
.toast.ok{border-left:3px solid #639922}
.toast.err{border-left:3px solid var(--red)}

/* LOADING */
.loading{text-align:center;padding:40px;color:var(--mid);font-size:13px}
.spinner{width:24px;height:24px;border:2px solid var(--border);border-top-color:var(--red);border-radius:50%;animation:spin 0.7s linear infinite;margin:0 auto 10px}
@keyframes spin{to{transform:rotate(360deg)}}

/* PBAR */
.pbar{height:4px;background:var(--beige);border-radius:2px;overflow:hidden;min-width:60px}
.pfill{height:100%;border-radius:2px;background:var(--red)}

/* RESPONSIVE — ottimizzazione viewport */
.sidebar{overflow-y:auto}
.sidebar::-webkit-scrollbar{width:3px}
.sidebar::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:3px}
.content{height:calc(100vh - 50px);overflow-y:auto}
/* Admin panel full height */
#admin-main{height:calc(100vh - 110px);overflow-y:auto}
/* Table scroll */
.overflow-x-auto{overflow-x:auto;-webkit-overflow-scrolling:touch}
.form-overlay{z-index:1000 !important}
#form-anagrafica{z-index:1000 !important}
#form-ordine{z-index:1000 !important}
#modal-nuovo-doc{z-index:1050 !important}
#modal-cfg{z-index:1100 !important}
/* Grid responsive */
@media(max-width:1200px){
  .grid-4{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:900px){
  .grid-2{grid-template-columns:1fr}
  .grid-4{grid-template-columns:1fr 1fr}
  .sidebar{width:180px;min-width:180px}
}
/* Card content max-height */
.card table{width:100%}
</style>
</head>
<body>

<!-- LOGIN -->
<div id="login-screen">
  <div class="login-box">
    <div class="login-logo">
      <img src="/logo-maxporte.png" alt="Max Porte" style="width:44px;height:44px;object-fit:contain;flex-shrink:0">
      <div>
        <div class="login-brand"><span>M</span><span>AX PORTE</span></div>
        <div class="login-payoff">Ogni porta un'idea</div>
      </div>
    </div>
    <div class="login-title">Accedi al gestionale</div>
    <div class="login-error" id="login-error"></div>
    <div class="form-group">
      <label class="form-label">Email</label>
      <input type="email" id="login-email" class="form-input" placeholder="simone@maxporte.it">
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <input type="password" id="login-password" class="form-input" placeholder="••••••••">
    </div>
    <button class="login-btn" id="login-btn" onclick="doLogin()">Accedi</button>
  </div>
</div>

<!-- APP -->
<div id="app">
  <!-- SIDEBAR -->
  <div class="sidebar">
    <div class="sb-logo">
      <div style="display:flex;align-items:center;gap:10px">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAIAAADajyQQAAAa/ElEQVR4nMV6d2BUVfb/ve+9mUwKJYEAySTT3puSBoh0EBu21Z/CKiuoiCyLsouIilv9fkV/NlQUBAQbNnRtyyoIKlKlhhR6ExQCBJJMy5Q3M6/de35/3MkQ3XWlhP2dvzIv991zPvf08y4GAPT/iQAgkUhkZWWZTKYO35zr8B1/mSigttPMzs5OJhIX43D/68AoRRxGGCOEMMY8z1uys1vD4Q7n898FRgjiOONkI/X7EUIIAACysrKyLJZ4PN6xrP6LwAAQz+vVNeTm32iffoYQQoRijBFCubm5hq4ritKB3P5bwChFCCmL39HGTcABv7p6LUII8We4d83Pl2WZENJRDC8+MEoRAEIYYax/uznLMGKCIOw9QA4fQRgDpWwVxrhz586tra0dxfZiAgNAlCKOQxgDJQghyx/upYLAcTjXMLQVXyGEMIW2tWA2m7Ozs6PRaIcwv2jAABDGiOPogUMIISwIiBDTwP5J0WXWdJkS5ctVQGnGGjPORilNJpMIoQvMARcHGEOFkD53Adx8W2rqQ0SWEc8jhCxjb8sVBJXns4810L37EcaozRoRQgCQn5+fSqUMw2BQz5suAjAAhBBtaUndfjc/Z35E181frNRG3W7s3Y84znzj9fHsbAzUbBjq8hUIIUTPaIaBye+aH41EAOBClHaxgCEKOMsMHIcN0irwcOiwfus4/YOPuKIifMO1XQHFKNVWrUGGgQT+JwA4nsvJzY1EIheiNNxh5QwFhABxHELtTPH9D/WnX+DleNwkcLpRIJhSE+4UbriWjJ+UUJXOvIA/eFsYMggIwTz/k/1isRjPcbl5eecnTgcBI21hgIVB1KY3jMmRH7RHH7NsrwsjBBwu0Emsshz8AQgEumAuOe62Ts89feb1NgIAjHEoFOrUqZPZbD4PiToCmEGQwBs/HIVTp00jhiNCUOb4DYIEHhDSX34F5i0iqpI0myyabmBMMDZRSoqK8jevRiYzYPyvhkcpDYfCBd0KOO6cXaYjfEzg9Y2btTF3chPv05avQDyPDJLWmMADpRjAPH0q9/G7uNxXoBNVEAjHYQCd5zsFAvrGLYjjcDqP/1g4jsvrlBeJRM5DqAsABoAoBUVRX32TTJis+wMxQ+em/1Fd/A4SeATp3gRzHCCECDH1v9Sy7FNj4vh8XjAZBDgOASQB9D/9Tf9kKeJ5hDH6l5LKYrGYTaZYLHau0p2/KQKlmOOoP5AaeqWuKITnEQDmuK4I6Q9ONT84DVOKcLpDQeiM+xmr1+r/+wQ91ZTCGAMIAF3MZvXaq4SZ/8MX9UI/eQshhFA4FMrJzbVYLGcv3jlrLJNeMMchQrkehWjCXZ05HnEIA4CitCLImv+q8j+Ps2LqTP7lOASACBGuuTpr5WfILVkAMMcZHBekhFu5Sr1htP7PZem32qkOALrm58vxOCHk7NVwbsAopbi9l3MYIZRz36RkXh5nUOB5obIcJVMhSrPe/bsy/REwDMRxZ7BhjHgeaTrXrRs3dkwexwNGGEDQ9JjAqwG/MOMv6tQHid+PeB5Ryl7EGHMc17lLl0hr69lntnMARinlOI5SqqoqYrUcxohQ3KMQjxvTlRcgkeRKSrJ/Pxm1+MNmwbJspTJhMk2lfoQNIRB4BJA18krZbEKEYoSQtSiPIuC4EAC//Ev1V6P05SsRxyGOA0JQW4lsyc4++0BytsAMw+A4LhwK3zX2jgenTUMIpQ2DwwggZ8rvEp3yhOxsdfkK0zVXZz/2V3yqKchj4dvN2h0TSSCAOC5jXZjjEEKcy2mU+ywIZSPEDx0Czz6RazJbDKPVxOtNfn76I8oDj9BgiCXu9iVyIpFAZ1Miw1kQpRQA6urqrrr8CpfN7nGJby1eDACGYQAA1Q0AkJ97kTp8gUJb5MrrASDx+FPBnG5BsUy3eRJXXKefOAEAYBjpHXUDAFKL3qA2b8jmjvn6UE3X63emRow0SqSg3Ruwe4xSd2LQZfqKr0BRgVKglIkRDAaNzD4/T78MjFBKCFny3nvlHh9D5Xa6fJK7vr4eAIhhMK4kFIpW9I84fIG8QuXd9wEg8cTTwdzuAWdZwioqg0foe/dlsFFCAID8cFSWKoM2N9h9yVffBAASiaSmzQBHWdgqBlxlqSIXePvqu3YDpbQNjGEYgUCAtuH8OToLUwTgOG7dmjVKKmkymVj3ruv6w9OnR6NRzHEUAFHgCgqECXd0AYQ7d0rNXQCRSM5jf8t+9M84EEhlmY3G09rYu/XttYjnQTcwxgiAczkNn8dCqGzo6rIvEKVcly6WebO1Jx415+Z20wl12PW3Fgl9erOBFkuMPM/nnk2J/G/hUkoJIcyLiGEAwInjx6t8ZZLDKdodTG+S3XHvpMkAYOg6JQQopaFwrGpAq8MX6FSYnD2XbZWcPTeY0y1Q6o5YxaS7Sln5NQCArqet8bXF1OYN2r2qq1zfuRsIoaoGAPruPdpfHiOnmwDAOH1am3ifvms3AFCDMDVFIhE5Hoc2NzkrU2y/lP3NED7z5JNup8vtEr2i5CwpZTa5aOFCANANAwwCAInZc6nNGyyVwlIlOd0EhABA6rU3Q8Vi0O4Jl0iK3ad88g8AAE0DSsmxhphYEbR7jFJP/G8zAQAMQtu5kP7tpkT/YUaJJF82kpxuAkqBpI0wEAioqnq2psgyFUJo7ksvzXnxRYyxYRhMsVOmTi0oyNdUtUvXLh6fL5VKYQ7PmzN3e3W1wPMUKAKw/HaCnN9F4AXS4k/NXcBKDdNlw3CnPKzrhOOSlGT9daa68HVkMgEAdthpVXkOgRhQsmotyDLiOVZ2AELaq2+Se+5Vm1sUACGl0PRcFVBbrx2LRmm7RNKeftoscBwny/L0aQ+8Mn/BqwsXzZ83TxAEFpHy8/On/OEPFoslGAiWlfnsDjsxiKHrMx58MBQKcYJADYPL7yrcM74zpaigq7rk7+TID9pny6NX3UCjUcQLGCHKc2FDF56drc6ajTkOI5R13bXZAk8tWV1CIX3tBkQpNgj1B/QHHjY//1KcGJ05ThgxVFixVKgoZ50eI57n8zp1+rnM9mNgCO3ds3fsbb/5csUKVrwueHnegvnzeUGglFJC7hw/3m53IEC1tXVTfv97juMwx7U0tzzy0EMIIcAYUWqZdE+0W74ZECAUv/0ueeqDCCFsNgPGORS6UAAKEZ7Lev3t5Iy/IIRMN14vY1yg6sq1VwuDByKOQ2YTxONo1dpWQnIxp08cb17yNt+zRzrLt8UMALBYLGazWZbl/wSMUooRmvnoowcPHuAFgRJCCUEYLZj78ivzF5hMJoMQk8n08B9nmMym5qamkydPPjRjBgCYzVlbNm+ZN3cuLwiGruNOeVmT7umMMLKY6elmJAhgNgOCbggbV48w/vbHbpZsTGmQEsvHS1NTpnElVtqvrzZlUtZr87mePdSP/5F48hledMHc5/M4DlFKFAXzPNJ0NvYyDh5isJjL5OXlaZrGiqEfUSbZsQhx8MCB3hWVbqerLQDaJIdTsjtenjMH2jLyuNtvF+2OMo/3eEPDpHvukRxOryiVuT0b1m9IB65YLNpvcLRECto8wVJ3a7ELnGWpJ54GSgFA/ejTRIkUsXkCYgXYvbF7p1IW3wCUWbM1h4/Yfcr7HwKAPPMpvdRN7V5l8TtMSGX+K4ZYmfr7x4xRJsIF/IF0tdAW+dCpxkZVVdPRzzAA4B+ffOoT3W6X6Cwp7denT9/KKru1pNzjffGFF9g7u3bu9ImSaHNMmzpVSaUGXtrf7RLdLnFQ/wEtzc1sTfKV18DmDTg84RIpUTVQ++fn6WilaQCgfLY8afdCqScxaqy+/wAAkEAgNWEytXmCNg/YvPL9DwEhlJDYr8epVqnVVa6tWRe//2Fw+MIlInj7GIePQFuiBwBVVVnWPhPug8Hg7t27GVZKqaHrAPDXP/9Zcjglp6vM7Zl+//1DBg5yltq8ovTCc8+z1x564AGXzV7m9hw8eHB79Xaf5PaKkmh33DF2HPNGGpejlw6JlEhRqxS94joAAFajAICuA4Dy6VLlj38lqgoAWl29MvxqpUQKucoTrnLt1TdY3AcAo/GU3HtQ1ColnWXJUne42KXZfeqs2TQWA0LZhgyPLMuRtqEdsDy2d8+eI98dyWAjhKiqevOvbhTtDsnhHNDv0vfeeXfooMEum90rSrOeeRYAjjc0VJWVu2z20beMAoCX58zxilKZ5Pa6xOeeeZZtnXjldbB7g84yKPUkX3szIyuz+4wE6vKVqlgRtopRqxi1iilXeWr5ivRBEAIA6pp1msMXcvgidq8yYLi2bMWZbEUptEt64XA4mUgyIIhSquv6po0bA34/e8QM8ofvv7+kqrfHJYp2x6gbb9q+rXrQgAGizeF1Sc8+/QwAPPv0M5LD6ZPcq77+GgDuvmu8aHeUSW6vKH3z1dcAoEej8YEjIiVSpMQd7zsYotEzkNoB03ftkSv60RJ37NZx0V+NUopccanSOHAovUw3ACDx/Iu6zZOyeRJPzgIAULUfHVMa449KZMR+t7a2bli/PpVMw2X/W/HFF15R8oqS2+l65MGHT5w4PmTAQGaTs59/AQCGDBgo2uzXjbxGVVW/3z980BBWmvTr0/dkQwMAJN58G2zeoLOMlHoSs14EANDTNQrVdTjWQBJJAEgt/Vx76E8AQE6ciFf0SxaL8auvp4kEEJLGRqk8drxqFeNihbp5GwBQRQEA4/iJ1PNz2sMzDKM1HKaUogzWhoaGrVu3Zn4ybI8/NtPjEpmNvb9kSXNz8/AhQ5hNvrpw4bLPP/e4RI9L/GDJ+wCwZfPmco+XKfm2UaN0TTPi8cjA4TG7N1LsikmVJBBk7LUNG5NX/yrh7ZMaPlJd2hZXKAUA5YuVurNcK5HkaTPSBsnkaW6RLx2eLHLFB4xg+2ibtsj9h4Pdl5q/CCgFgzDJFUVJpVKovR537dp1YP/+jLMZhqHp2pjRo0W7wye5y9ye3bt2NTU1XTZ0qMtmlxzO52fNGjtmjMtmv2zI0Gg0CgCvLlzocYllbrfb6Xri0f8FAHnxO1DqiZf1U/65DAAogPrKa6qrXLaK/vziSC8HuKuSb72bxmAQAJBnPqVaJc3mTb793o+cbeOWlKtctYqx396rvLNEdZWHrGKqWIwOGEGjUdY9ZVR3pghmYWPTpk2nT51OPyEUAE6ePNmvT1+3S3Q7nIP7D4jFYidPnLhqxBWuUptod1x79UhmqwvmzWdv3TdpcjqzSe4vv/4aABIT79P37gcA0tySuv9hcJYHezmCNk/0ljEhT1W4l11xVeh1O9qwGWAY8VvGpIrFuFih7dyddjbDAIDkvIXE5gmXiLrdF7S5qd2bHHMXaTyVUTijWCz2I2AAIMvy+nXr4/F4xmQBYPU333hFySe5Rbtj/J13AsCJ48evu+Ya1sKwVN6/7yX+lhZKaWtr6+XDhrsdLsnpqvB4T586xRhSw0gt+RBcFYFSd9jXV6+pAwB9155QVX+lpyNyy5j0kbNe6WSj3GdQyirFLxtJMtowDACIT/idUuIOO8qIo0yd+RTVdWizMSbzkSNHdtbX/6htYf871Xhq08aNhKRN1tANAHju2Wc9LrHM7fW4xJdmvwgATadPj77p/0gOp1sUPaLodrr+78zH2T47duxgzrZo/vxkKpU+Tk2jhMQn32+UuAN2r755K1usfvWNv5tVESv0+p2sZ2Fti7JqjeIoU61SbPJUAADdAEKAUhIMxfsPU1zl6qf/PCM3pQCQSqW2bdu2a8fOSGvrT/sxtmL/vn27d+2CtjrLMAzaVkmxOLlh/XoACIfDo28ZJdkdHlGUHM5KX9mxo0fZDu+/t+SrFSuBha/mlkyJQCKR2LCr44W2oLc3OdnIlNB65fWGVdS216StDtLKSTzzvFbq1m3e5GuL04ZKCABotfV6dQ17kpkR+Ftavvryy3179pw8cRL+Q6O5dcuWhoYGaPM9AGhuah7UfwCrngb3H9DU1AQA0Wh0zK23ijZ7udvrdroeemA6AOjMPAASH3ykXDYyWtEvee1Nelv00+p2KN4+4QJr5KZfAwA53dxafknEU6U89qT+3gdpi2JDDkpjvxmvWMW4q1yrqQNWH2Z8qR2q748c+Wzp0uqt206eOMHe/tlhTiqVWrd2XebLIsP27foN5R5v++oJAGRZvnPsOLfTJdodlb6yoz/8AACEkuTfPwaHL9LDHsztHiuwglSZeDRtq8nF74BY6S8olqfNiFx7UyC/SLN5oMQNNk9y0hSq6RmPMpqa432HJEqkeP/hpOF42gkJoW3BHQBqa2rWrl69dcvWQCCQUczPzjwAoKWlZeOGb7W242d6mPvSHDalcjtcz8+alRY0mfzdxIkVXt8nH3+saRqllKpa69Ar5WJXqM/AxKzZkZtvCxQUg7NMZv0/gPz76YbN6+9WEiwsTYkV8rSHYxMmx0okKPUkHvoT48ewqRs2UkdZwtdHr67JRJfMmW5Yt66mevuunTtlOZF5/rPAMisOHz5cX1ub0RjDdvdd41lA90nutavXsPWJhHxw/372JgDQaKz1ksHh3G7Jl18BAKpq8XunBvKLwF2VnLeQLZAvvzZm96YcPuWNt9IH9OjjWqlbt3lSry8GABZvACC55AN9335mOWfOvbn5yxUr6+vqDn93mAlG/20e+zlsNdtrDh8+DO2cLRgMDhs8hA1z+ve95OCBg7Qtz6RJN4CQyI2j5M4949MfSQtkkOit40IFVl2qVFevBQB99x7ZXSVbpfjt40FRgBBqGPKYO1LFYsJZrrGwyaqqjEBtoh/+7rtln31WvXXbyZMn20t7VsDYalVVv92wIWO+LLNVb9vmk9yiw+mT3O+/+y5bbJxugoPf0bbJUWrh62D3Bkol48BBZkI0GAr1HxYptMl9hxgNJwAg9f6Hms1LSt3y3x5j/EiLX+4/PGEVo2Kl+tlyYE0X86u2prG2pmbDuvVbNm8Oh8P/CulsgQFAa7h1/bp1qVSqPbYF8+Zf2qfvqi+/ZCuV+YuSlf1lsSJ1xXXayq8BgIbC8YEjovnF0VvGACGgqgCg1+0IWEXVKsVvG8cas/iDj6glkubwsZoLALTa+pjdm+gzWFu9NlMoMUni8fi6NWu2V1fv2rEj2Vay/1vJf3nEzd48dvRY9bZtmZ/MLE81NgKAHoko900DZ1mwe6m/c49ooQ3cVclX3wCA1EefglTp79wz+eLL0FaSp95429+lF7jKE/MXAQBNJuMjb0wUueTyfvqR7zPYjOMnMuyZp50+dWr5suU76uu/++67nwwCzhNYpkQ+eODAme3YAKN+h3LVDXqpO1DsDA8aIc/4S/iSwaEeNnBXaWvWAUB04mS91O3vYdM3bgYAprfYxHvDXYtkX1/jyPcAYBw6HPP0TljF+MgbiT9wZmBKzsT0gwcPLv982ZbNm0+xyvA/ojorYJldDMPYvGkTy8uUUjAIIURbuwFc5cESKVzWlzQ1AwA51hAeMDzWwxYdMIzGYiQYSgy8PNbDHuo9gDQ1s/6CNLeEKi/Vi5zxKdPY/srSz8HmTYoVem0dAFBNg3Yz9upt1d9u2FCzfXtra+svQjpnYAAQj8fXr1sny3L6KRtrv/IaOMv9PWzJl+axx/rW6kCRE+y+1KI3AEDdtEWRKsPdrJFRvwHDYPOc1OuLA516xH19ybEGpvzkS/PS5UW7mB6Lxb5Ztaqutm7Pnj2KopwlqnMAltmx8eTJzZs2pUtkSllxLU+aope4/d2szPwAIDp6bKrAGht3N/uZfH0xiJWBrr3kB2akd4tEQr6+pMStfLIUID3hYWwyHE81Nq5YvryupvboDz/8olP9hM7hUy3GGACsJSVd8/P37dmDMaYA7Itj9ouzVFupRTDFpz1M/X5ECPX7kdlM5SRCCOlG9uTfJn59S/f8/NT7H8rTHqb+gFFTD6kkx3MomWTbAyHpKwMIIYQO7N9fX1df0K1bcYnV6XLx7T5tnpW0cI7XIdj67duqi63FNrsdADAFxHN6/U5j3AQlFOYuH84Jgrp+Y/e83NSU32X/eQbSDcRhxHHJ+x/K+Xp1MBLhinpBMsWllNzcHP6LpXyZl12WoJRyHGcYRl1tLSFEMJm8Xm/Xrl3PScIzgp4TMWNIJpPtS2Q2S0q+8Ra4KgI97YHuJUqpJz56LJXl9h07BUg98ZQmVVKrSEs9qqs83fy3c6pIJLJm1Td1tbXn6lQ/ofO5wAIAGGN/S8uhQ4eGDhsuCDwAYEoRz8tTHjB/tUrDGF02NPe9xezLZdq62v4gO3aRb9YgSrmbbhB6VzFdsT0bGxt31Ndbrdb8ggKHw8G1PT8PhZ3nzRzG7/Dhw7Is9+vXDwAYc0gkEzeO5o/8QJz2nI/e40pLzgBj2KDt6h8jSjPXw/bt3dvQ0FBQUOASxV69ep03pAsClsFWW1NbUFAgSiLTPuI4Y+9+9ddjzcmU2v+S3KUfYnbTpr2IlCIKCCNACHEcxljTtNqaWg5jwWzyejydu3S5QFToQi6JMcZ9+vZpbGwMhUIYY8AYDCJUVfAzH0WCkLVjd+rxpzOXUNrx5JDAI55nqCKRyLq1ay2WrC75XXv37t0hqC4IGCOz2dy7T+99e/eqioIxxjyHDMNy11ht9M2AwPTBR+rylVgQEPk3H1QxxidOnNi44dvC7oXdu3cvKyvLyspC5xLT/wNd6EVMdrrHjh5taWkZPGRI2tkAQFXlW8YIB78jWVmWpR8KfaoQBXb3KqOQPbt3N50+nZOT6ysvKyws/JE3XjB1wEVMAHC6XNnZ2YcOHsQYs3PC2dnZ8+dwFgsuLsYmIXPJkn28VxVl8+bNCVku6N69b79LCgsLoUNRoQ65Ost2oJRu3bLF4/X27NkTEMKUIo7Tt2zjvR6uezemDaarcChUU1Pbs2ePLItFkiSz2dwhTvUT6pjLzkwyWZbr6+oHDByQk5MDCOGMEtplqmPHju3dvadXUa8ePXs6HI4LZ/1z1GHX05ncpxobjzU0DB02DLMYQCnCGNriwe5duwJ+vyU7x+fzdi8svBiKylDH3btvw7Zv3z4AqKqqYoUfe6goSnV1dbbFYjZlub3uvLy8i4oKdSww1IZte3V1UXGxzWaDtuvzdTW1PXv2zMnJdoqiid3JuZio0EUCpqrq3r17JUnq2rXr8ePHDx86lJ2d45LE4uJi1C7cX1TqYGAZ0jSNtfHHjh7tXlhYVFTEzA91UP79Rfp/z1IojGElnF4AAAAASUVORK5CYII=" alt="Max Porte" style="width:44px;height:44px;object-fit:contain;flex-shrink:0;background:#fff;border-radius:6px">
        <div>
          <div style="font-size:15px;font-weight:700;color:#fff;letter-spacing:0.5px">MPX</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:0.8px;text-transform:uppercase">Gestionale</div>
        </div>
      </div>
    </div>
    <div class="sb-section">Principale</div>
    <div class="sb-item active" onclick="nav('dashboard',this)">
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
      Dashboard
    </div>
    <div class="sb-section">Commerciale</div>
    <div class="sb-item" onclick="nav('anagrafiche',this)">
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="5" r="3"/><path d="M1 14c0-3 2-5 5-5s5 2 5 5"/><path d="M11 2a3 3 0 010 6"/><path d="M15 14c0-3-1.5-5-4-5"/></svg>
      Anagrafiche
    </div>
    <div class="sb-item" onclick="nav('preventivi',this)">
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 2h12v12H2z" rx="1"/><path d="M5 5h6M5 8h6M5 11h3"/><path d="M11 10l1.5 1.5L15 9"/></svg>
      Preventivi
    </div>
    <div class="sb-item" onclick="nav('ordini_vendita',this)">
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1.5h1.8l1.3 8.2a1 1 0 0 0 1 .8h6.4a1 1 0 0 0 1-.78L14.8 4H3.6"/><circle cx="6" cy="13.5" r="1"/><circle cx="11.5" cy="13.5" r="1"/></svg>
      Conferme d'ordine
    </div>
    <div class="sb-item" onclick="nav('fatture',this)">
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="1" width="12" height="14" rx="1"/><path d="M5 5h6M5 8h6M5 11h4"/></svg>
      Fatture
    </div>
    <div class="sb-section">Produzione</div>
    <div class="sb-item" onclick="nav('magazzino',this)">
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 6L8 2l7 4v8H1V6z"/><rect x="5" y="10" width="6" height="4"/></svg>
      Magazzino
    </div>
    <div class="sb-item" onclick="nav('produzione',this)">
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2"/></svg>
      Produzione MRP
    </div>
    <div class="sb-section">Gestione</div>
    <div class="sb-item" onclick="nav('dipendenti',this)">
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M2 15c0-4 2.7-6 6-6s6 2 6 6"/></svg>
      Dipendenti
    </div>
    <!-- ADMIN MENU — visibile solo ad admin e super_admin -->
    <div id="sb-admin-section" style="display:none">
      <div class="sb-section">Configurazione</div>
      <div class="sb-item" id="sb-item-admin" onclick="nav('admin',this)">
        <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="1" width="14" height="14" rx="2"/><path d="M5 8h6M8 5v6"/></svg>
        Catalogo prodotti
      </div>
      <div class="sb-item" id="sb-item-utenti" onclick="nav('utenti',this)" style="display:none">
        <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M2 15c0-4 2.7-6 6-6s6 2 6 6"/><path d="M11 1l1.5 1.5L14 1"/></svg>
        Utenti e ruoli
      </div>
    </div>
    <div class="sb-footer">
      <div style="font-size:10px;color:rgba(255,255,255,0.25);margin-bottom:3px" id="sb-ruolo-badge"></div>
      <div class="sb-user" id="sb-user-email">—</div>
      <div class="sb-logout" onclick="doLogout()">Esci</div>
    </div>
  </div>

  <!-- MAIN -->
  <div class="main">
    <div class="topbar">
      <div style="display:flex;align-items:center">
        <span class="topbar-title" id="topbar-title">Dashboard</span>
        <span class="topbar-bc" id="topbar-bc">Panoramica generale</span>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span style="font-size:12px;color:var(--mid)" id="topbar-date"></span>
        <button class="btn btn-red btn-sm" id="topbar-action" onclick="openForm()" style="display:none">+ Nuovo</button>
      </div>
    </div>
    <div class="content" id="main-content">
      <div class="loading"><div class="spinner"></div>Caricamento...</div>
    </div>
  </div>
</div>

<!-- FORM ANAGRAFICA -->
<div class="form-overlay" id="form-anagrafica" style="justify-content:center;align-items:flex-start;padding:20px">
  <div class="form-modal" style="width:min(860px,100%);max-height:92vh;display:flex;flex-direction:column">
    <div class="form-modal-head">
      <span class="form-modal-title" id="form-ana-title">Nuova anagrafica</span>
      <button class="form-close" onclick="closeForm('form-anagrafica')">×</button>
    </div>
    <div class="form-modal-body">
      <input type="hidden" id="ana-id">
      <div class="form-tabs">
        <div class="form-tab active" onclick="anaTab('generale',this)">Generale</div>
        <div class="form-tab" onclick="anaTab('sede',this)">Sede legale</div>
        <div class="form-tab" onclick="anaTab('sdi',this)">SDI / Fatturazione</div>
        <div class="form-tab" onclick="anaTab('banca',this)">Dati bancari</div>
        <div class="form-tab" onclick="anaTab('commerciale',this)">Commerciale</div>
      </div>

      <!-- TAB GENERALE -->
      <div id="ana-tab-generale">
        <div class="form-section">Tipo soggetto</div>
        <div class="form-grid">
          <div class="form-field">
            <label>Tipo <span class="req">*</span></label>
            <select id="ana-tipo" onchange="aggiornaCampiPerTipo(this.value)">
              <option value="">Seleziona...</option>
              <option value="cliente">Cliente</option>
              <option value="fornitore">Fornitore</option>
              <option value="entrambi">Cliente e Fornitore</option>
            </select>
            <span class="err">Campo obbligatorio</span>
          </div>
          <div class="form-field">
            <label>Canale</label>
            <select id="ana-canale">
              <option value="">—</option>
              <option value="rivenditore">Rivenditore</option>
              <option value="architetto">Architetto</option>
              <option value="privato">Privato</option>
              <option value="impresa">Impresa</option>
            </select>
          </div>
          <div class="form-field">
            <label>Natura giuridica</label>
            <select id="ana-natura">
              <option value="">Seleziona...</option>
              <option value="Srl">Srl</option>
              <option value="SpA">SpA</option>
              <option value="Sas">Sas</option>
              <option value="Snc">Snc</option>
              <option value="Ditta individuale">Ditta individuale</option>
              <option value="Persona fisica">Persona fisica</option>
              <option value="Professionista">Professionista</option>
            </select>
          </div>
        </div>
        <div class="form-section">Dati fiscali obbligatori</div>
        <div class="form-field" style="margin-bottom:10px">
          <label>Ragione sociale <span class="req">*</span></label>
          <input type="text" id="ana-ragione" placeholder="Es: Arredamenti Rossi Srl">
          <span class="err">Campo obbligatorio</span>
        </div>
        <div class="form-grid">
          <div class="form-field" id="field-piva">
            <label>Partita IVA <span class="req">*</span></label>
            <input type="text" id="ana-piva" placeholder="11 cifre" maxlength="11" oninput="validatePIVA()">
            <span class="err" id="err-piva">P.IVA non valida (11 cifre)</span>
          </div>
          <div class="form-field">
            <label>Codice fiscale</label>
            <input type="text" id="ana-cf" placeholder="16 caratteri" maxlength="16" style="text-transform:uppercase" oninput="validateCF()">
            <span class="err" id="err-cf">Codice fiscale non valido</span>
          </div>
          <div class="form-field">
            <label>Regime fiscale</label>
            <select id="ana-regime">
              <option value="ordinario">Ordinario</option>
              <option value="forfettario">Forfettario</option>
              <option value="esente">Esente IVA</option>
              <option value="intracomunitario">Intracomunitario</option>
            </select>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-field">
            <label>Codice REA</label>
            <input type="text" id="ana-rea" placeholder="Es: TO-123456">
          </div>
          <div class="form-field" style="flex-direction:row;align-items:center;gap:8px;padding-top:18px">
            <input type="checkbox" id="ana-ritenuta" style="width:16px;height:16px;accent-color:var(--red)">
            <label for="ana-ritenuta" style="text-transform:none;letter-spacing:0;font-size:13px;color:var(--dark)">Soggetto a ritenuta d'acconto</label>
          </div>
        </div>
        <div class="form-section">Contatti principali</div>
        <div class="form-grid">
          <div class="form-field">
            <label>Email</label>
            <input type="email" id="ana-email-principale" placeholder="info@azienda.it">
          </div>
          <div class="form-field">
            <label>Telefono</label>
            <input type="tel" id="ana-telefono-principale" placeholder="+39 011 123456">
          </div>
          <div class="form-field">
            <label>Cellulare</label>
            <input type="tel" id="ana-cellulare-principale" placeholder="+39 333 1234567">
          </div>
        </div>
        <div class="form-section">Identificativo</div>
        <div class="form-grid-2">
          <div class="form-field">
            <label>Codice cliente / fornitore</label>
            <input type="text" id="ana-codice" placeholder="Generato automaticamente" style="text-transform:uppercase">
            <small id="ana-codice-hint" style="color:var(--mid);font-size:11px;margin-top:2px">Il codice viene assegnato automaticamente al salvataggio. Puoi modificarlo manualmente.</small>
          </div>
        </div>
      </div>

      <!-- TAB SEDE -->
      <div id="ana-tab-sede" class="section-hidden">
        <div class="form-section">Sede legale</div>
        <div class="form-field" style="margin-bottom:10px">
          <label>Indirizzo <span class="req">*</span></label>
          <input type="text" id="ana-indirizzo" placeholder="Via/Piazza + numero civico">
          <span class="err">Campo obbligatorio</span>
        </div>
        <div class="form-grid">
          <div class="form-field">
            <label>CAP <span class="req">*</span></label>
            <input type="text" id="ana-cap" placeholder="12345" maxlength="5">
            <span class="err">Campo obbligatorio</span>
          </div>
          <div class="form-field">
            <label>Città <span class="req">*</span></label>
            <input type="text" id="ana-citta" placeholder="Es: Torino">
            <span class="err">Campo obbligatorio</span>
          </div>
          <div class="form-field">
            <label>Provincia <span class="req">*</span></label>
            <input type="text" id="ana-provincia" placeholder="TO" maxlength="2" style="text-transform:uppercase">
            <span class="err">Campo obbligatorio</span>
          </div>
        </div>
        <div class="form-field" style="margin-bottom:14px">
          <label>Paese</label>
          <select id="ana-paese">
            <option value="IT">Italia</option>
            <option value="DE">Germania</option>
            <option value="FR">Francia</option>
            <option value="ES">Spagna</option>
            <option value="CH">Svizzera</option>
            <option value="AT">Austria</option>
            <option value="GB">Regno Unito</option>
            <option value="US">Stati Uniti</option>
            <option value="altro">Altro</option>
          </select>
        </div>
        <div class="form-section">Sede operativa (se diversa)</div>
        <div class="form-field" style="flex-direction:row;align-items:center;gap:8px;margin-bottom:10px">
          <input type="checkbox" id="ana-sede-op" style="width:16px;height:16px;accent-color:var(--red)" onchange="toggleSedeOp()">
          <label for="ana-sede-op" style="text-transform:none;letter-spacing:0;font-size:13px;color:var(--dark)">Sede operativa diversa dalla sede legale</label>
        </div>
        <div id="sede-op-fields" class="section-hidden">
          <div class="form-field" style="margin-bottom:10px">
            <label>Indirizzo sede operativa</label>
            <input type="text" id="ana-so-indirizzo" placeholder="Via/Piazza + numero civico">
          </div>
          <div class="form-grid">
            <div class="form-field"><label>CAP</label><input type="text" id="ana-so-cap" maxlength="5"></div>
            <div class="form-field"><label>Città</label><input type="text" id="ana-so-citta"></div>
            <div class="form-field"><label>Provincia</label><input type="text" id="ana-so-provincia" maxlength="2" style="text-transform:uppercase"></div>
          </div>
        </div>
      </div>

      <!-- TAB SDI -->
      <div id="ana-tab-sdi" class="section-hidden">
        <div class="form-section">Fatturazione elettronica (SDI)</div>
        <div style="background:var(--blue-bg);border-radius:var(--radius);padding:10px 13px;font-size:12px;color:var(--blue-tx);margin-bottom:14px;line-height:1.6">Per la fatturazione elettronica B2B è obbligatorio uno tra Codice SDI oppure PEC di fatturazione. Per privati/consumatori finali si usa "0000000".</div>
        <div class="form-grid-2">
          <div class="form-field">
            <label>Codice SDI</label>
            <input type="text" id="ana-sdi" placeholder="Es: ABCDEFG (7 caratteri)" maxlength="7" style="text-transform:uppercase">
          </div>
          <div class="form-field">
            <label>PEC fatturazione</label>
            <input type="email" id="ana-pec-fatt" placeholder="fatture@pec.azienda.it">
          </div>
        </div>
        <div class="form-field" style="flex-direction:row;align-items:center;gap:8px;margin-top:8px">
          <input type="checkbox" id="ana-split" style="width:16px;height:16px;accent-color:var(--red)">
          <label for="ana-split" style="text-transform:none;letter-spacing:0;font-size:13px;color:var(--dark)">Split payment (PA e SpA quotate)</label>
        </div>
        <div class="form-section" style="margin-top:16px">PEC aziendale</div>
        <div class="form-field">
          <label>PEC aziendale</label>
          <input type="email" id="ana-pec" placeholder="azienda@pec.it">
        </div>
      </div>

      <!-- TAB BANCA -->
      <div id="ana-tab-banca" class="section-hidden">
        <div class="form-section">Coordinate bancarie</div>
        <div class="form-field" style="margin-bottom:10px">
          <label>IBAN</label>
          <input type="text" id="ana-iban" placeholder="IT60 X054 2811 1010 0000 0123 456" maxlength="34" style="text-transform:uppercase" oninput="validateIBAN()">
          <span class="err" id="err-iban">IBAN non valido</span>
        </div>
        <div class="form-grid">
          <div class="form-field">
            <label>BIC / SWIFT</label>
            <input type="text" id="ana-bic" placeholder="Es: BCITITMM">
          </div>
          <div class="form-field">
            <label>Banca</label>
            <input type="text" id="ana-banca" placeholder="Es: Intesa Sanpaolo">
          </div>
          <div class="form-field">
            <label>Intestatario conto</label>
            <input type="text" id="ana-intestatario" placeholder="Se diverso da ragione sociale">
          </div>
        </div>
        <div class="form-section">CIN / ABI / CAB</div>
        <div class="form-grid">
          <div class="form-field">
            <label>CIN</label>
            <input type="text" id="ana-cin" placeholder="Es: X" maxlength="1" style="text-transform:uppercase">
          </div>
          <div class="form-field">
            <label>ABI</label>
            <input type="text" id="ana-abi" placeholder="Es: 05428" maxlength="5">
          </div>
          <div class="form-field">
            <label>CAB</label>
            <input type="text" id="ana-cab" placeholder="Es: 11101" maxlength="5">
          </div>
        </div>
      </div>

      <!-- TAB COMMERCIALE -->
      <div id="ana-tab-commerciale" class="section-hidden">
        <div class="form-section">Contatti</div>
        <div class="form-grid">
          <div class="form-field">
            <label>Referente principale</label>
            <input type="text" id="ana-referente" placeholder="Nome Cognome">
          </div>
          <div class="form-field">
            <label>Email referente</label>
            <input type="email" id="ana-email" placeholder="referente@azienda.it">
          </div>
          <div class="form-field">
            <label>Telefono referente</label>
            <input type="tel" id="ana-telefono" placeholder="+39 011 123456">
          </div>
        </div>
        <div class="form-grid-2" style="margin-bottom:10px">
          <div class="form-field">
            <label>Cellulare referente</label>
            <input type="tel" id="ana-cellulare-referente" placeholder="+39 333 1234567">
          </div>
        </div>
        <div class="form-field" style="margin-bottom:10px" id="field-email-ordini">
          <label>Email ordini</label>
          <input type="email" id="ana-email-ordini" placeholder="ordini@azienda.it (per fornitori)">
        </div>
        <div class="form-section">Condizioni commerciali</div>
        <div class="form-grid">
          <div class="form-field">
            <label>Condizioni pagamento</label>
            <select id="ana-pagamento">
              <option value="">—</option>
              <option value="30gg RIBA">30gg RIBA</option>
              <option value="60gg RIBA">60gg RIBA</option>
              <option value="30gg bonifico">30gg bonifico</option>
              <option value="60gg bonifico">60gg bonifico</option>
              <option value="Anticipato">Anticipato</option>
              <option value="Contanti">Contanti</option>
            </select>
          </div>
          <div class="form-field">
            <label>Fido commerciale (€)</label>
            <input type="number" id="ana-fido" placeholder="Es: 10000" min="0">
          </div>
          <div class="form-field">
            <label>Agente di riferimento Max Porte</label>
            <select id="ana-agente-id">
              <option value="">— Nessun agente —</option>
            </select>
          </div>
        </div>
        <div id="ana-section-fornitore">
        <div class="form-section">Solo fornitori</div>
        <div class="form-grid">
          <div class="form-field">
            <label>Categoria fornitura</label>
            <select id="ana-cat-forn">
              <option value="">—</option>
              <option value="Legno/telai">Legno / telai</option>
              <option value="Accessori">Accessori</option>
              <option value="Verniciatura">Verniciatura</option>
              <option value="Vetro">Vetro</option>
              <option value="Servizi">Servizi</option>
              <option value="Altro">Altro</option>
            </select>
          </div>
          <div class="form-field">
            <label>Lead time (giorni)</label>
            <input type="number" id="ana-leadtime" placeholder="Es: 15" min="0">
          </div>
          <div class="form-field">
            <label>Valutazione (1–5)</label>
            <select id="ana-valutazione">
              <option value="">—</option>
              <option value="5">5 — Eccellente</option>
              <option value="4">4 — Buono</option>
              <option value="3">3 — Nella media</option>
              <option value="2">2 — Scarso</option>
              <option value="1">1 — Critico</option>
            </select>
          </div>
        </div>
        <div class="form-section">Note</div>
        <div class="form-field">
          <label>Note interne</label>
          <textarea id="ana-note" placeholder="Informazioni aggiuntive..."></textarea>
        </div>
      </div>
    </div>
    <div class="form-modal-foot">
      <button class="btn" onclick="closeForm('form-anagrafica')">Annulla</button>
      <button class="btn btn-red" onclick="saveAnagrafica()">Salva anagrafica</button>
    </div>
  </div>
</div>

<!-- MODAL INVIA PREVENTIVO -->
<div id="modal-invia-preventivo" class="form-overlay" style="justify-content:center;align-items:flex-start;padding:20px">
  <div class="form-modal" style="max-width:600px">
    <div class="form-modal-head">
      <span class="form-modal-title">Invia preventivo</span>
      <button class="form-close" onclick="closeForm('modal-invia-preventivo')">&times;</button>
    </div>
    <div class="form-modal-body">
      <div class="form-field"><label>A <span class="req">*</span></label>
        <input type="email" id="invia-email-to" placeholder="email@cliente.it"></div>
      <div class="form-field"><label>CC</label>
        <input type="email" id="invia-email-cc" placeholder="opzionale"></div>
      <div class="form-field"><label>Oggetto <span class="req">*</span></label>
        <input type="text" id="invia-oggetto"></div>
      <div class="form-field"><label>Testo <span class="req">*</span></label>
        <textarea id="invia-testo" rows="10" style="font-size:13px;line-height:1.5"></textarea></div>
      <div style="font-size:12px;color:var(--mid);margin-top:4px">Il PDF sara allegato automaticamente</div>
    </div>
    <div class="form-modal-foot">
      <button class="btn" onclick="closeForm('modal-invia-preventivo')">Annulla</button>
      <button class="btn btn-red" id="btn-invia-conferma" onclick="confermaInvioPreventivo()">Invia</button>
    </div>
  </div>
</div>

<!-- MODAL OPZIONI EXPORT PDF -->
<div id=\"modal-export\" class=\"form-overlay\" style=\"justify-content:center;align-items:flex-start;padding:20px\">
  <div class=\"form-modal\" style=\"max-width:480px\">
    <div class=\"form-modal-head\">
      <span class=\"form-modal-title\">Opzioni esportazione PDF</span>
      <button class=\"form-close\" onclick=\"closeForm('modal-export')\">&times;</button>
    </div>
    <div class=\"form-modal-body\">
      <label style=\"display:flex;align-items:center;gap:10px;cursor:pointer;padding:8px 0\">
        <input type=\"checkbox\" id=\"exp-solo-netti\" style=\"width:18px;height:18px;margin:0;flex-shrink:0\">
        <span style=\"font-size:14px\">Mostra solo prezzi netti (nascondi listino e sconto)</span>
      </label>
      
    </div>
    <div class=\"form-modal-foot\">
      <button class=\"btn\" onclick=\"closeForm('modal-export')\">Annulla</button>
      <button class=\"btn btn-red\" onclick=\"eseguiEsportaPDF()\">Genera PDF</button>
    </div>
  </div>
</div>

<!-- MODAL MAGAZZINO -->
<div id="modal-magazzino" class="form-modal-overlay">
  <div class="form-modal" style="max-width:680px">
    <div class="form-modal-head"><span class="form-modal-title" id="mag-title">Articolo</span>
      <button class="form-close" onclick="closeForm('modal-magazzino')">&times;</button></div>
    <div class="form-modal-body" style="max-height:70vh;overflow-y:auto">
      <div class="form-field"><label>Descrizione *</label><input id="mag-descrizione" type="text" oninput="aggiornaCodiceMP()"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-field"><label>Codice MP <span style="font-size:10px;color:var(--mid)">(auto)</span></label>
          <div style="display:flex;gap:6px"><input id="mag-codice_mp" type="text" style="flex:1">
          <button class="btn btn-sm" onclick="aggiornaCodiceMP(true)" title="Rigenera">&#8635;</button></div></div>
        <div class="form-field"><label>Categoria</label><select id="mag-categoria" onchange="aggiornaCodiceMP();aggiornaColoriMag()"><option value="">&#8212;</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-field"><label>Colore</label><select id="mag-codice_finitura" onchange="aggiornaFinMag(this);aggiornaCodiceMP()"><option value="">&#8212; Nessuna &#8212;</option></select></div>
        <div class="form-field"><label>Unit&#224;</label><select id="mag-unita">
          <option value="pz">pz</option><option value="m">m</option>
          <option value="m2">m&#178;</option><option value="kg">kg</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
        <div class="form-field"><label>Larghezza (mm)</label><input id="mag-larghezza_mm" type="number" oninput="aggiornaCodiceMP()"></div>
        <div class="form-field"><label>Altezza (mm)</label><input id="mag-altezza_mm" type="number" oninput="aggiornaCodiceMP()"></div>
        <div class="form-field"><label>Spessore (mm)</label><input id="mag-spessore_mm" type="number" oninput="aggiornaCodiceMP()"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-field"><label>Pz per confezione/bancale</label><input id="mag-pz_per_confezione" type="number" min="1" value="1"></div>
        <div class="form-field"><label>Unit&#224; di ordine</label><select id="mag-unita_ordine">
          <option value="pz">Pezzi singoli</option>
          <option value="confezione">Confezioni/bancali</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
        <div class="form-field"><label>Giacenza</label><input id="mag-giacenza" type="number" value="0" readonly style="background:var(--beige);color:var(--mid)" title="Modifica tramite movimenti"></div>
        <div class="form-field"><label>Scorta min.</label><input id="mag-scorta_minima" type="number" value="0"></div>
        <div class="form-field"><label>Scorta target</label><input id="mag-scorta_target" type="number" value="0"></div>
      </div>
      <div class="form-field"><label>Ubicazione</label><input id="mag-ubicazione" type="text"></div>
      <div id="mag-fornitori-section" style="display:none">
        <div style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid);margin:14px 0 8px">Fornitori</div>
        <div id="mag-fornitori-list" style="margin-bottom:8px"></div>
        <button class="btn btn-sm" onclick="apriAggiuntaFornitore()">+ Aggiungi fornitore</button>
      </div>
      <div id="mag-movimenti-section" style="display:none">
        <div style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid);margin:14px 0 8px">Movimenti di magazzino</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px">
          <select id="mov-tipo" style="padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px">
            <option value="carico">Carico</option>
            <option value="scarico">Scarico</option>
            <option value="rettifica">Rettifica giacenza</option>
          </select>
          <input type="number" id="mov-quantita" placeholder="Quantit&#224;" style="padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px">
          <input type="text" id="mov-causale" placeholder="Causale" style="padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px">
        </div>
        <button class="btn btn-sm btn-red" onclick="registraMovimento()">Registra</button>
        <div id="mag-movimenti-list" style="margin-top:10px;font-size:12px"></div>
      </div>
    </div>
    <div class="form-modal-foot">
      <button class="btn" onclick="closeForm('modal-magazzino')">Chiudi</button>
      <button class="btn" style="color:var(--red);display:none" onclick="eliminaArticoloMag()" id="mag-btn-elimina">Elimina</button>
      <button class="btn btn-red" onclick="salvaMagazzino()">Salva</button></div>
  </div>
</div><!-- FORM ORDINE -->
<div class="form-overlay" id="form-ordine" style="justify-content:center;align-items:flex-start;padding:20px">
  <div class="form-modal" style="width:min(680px,100%);max-height:92vh;display:flex;flex-direction:column">
    <div class="form-modal-head">
      <span class="form-modal-title" id="form-ord-title">Nuovo ordine</span>
      <button class="form-close" onclick="closeForm('form-ordine')">×</button>
    </div>
    <div class="form-modal-body">
      <input type="hidden" id="ord-id">
      <div class="form-section">Dati ordine</div>
      <div class="form-grid">
        <div class="form-field">
          <label>N° Ordine <span class="req">*</span></label>
          <input type="text" id="ord-numero" placeholder="Es: #1048">
          <span class="err">Campo obbligatorio</span>
        </div>
        <div class="form-field">
          <label>Cliente <span class="req">*</span></label>
          <select id="ord-cliente">
            <option value="">Seleziona cliente...</option>
          </select>
          <span class="err">Campo obbligatorio</span>
        </div>
        <div class="form-field">
          <label>Serie / Prodotto</label>
          <select id="ord-serie">
            <option value="">—</option>
            <option value="Exclusive">Exclusive</option>
            <option value="Laccato">Laccato</option>
            <option value="Scorrevole">Scorrevole</option>
            <option value="Fusion">Fusion</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label>Quantità (porte)</label>
          <input type="number" id="ord-qty" placeholder="0" min="1">
        </div>
        <div class="form-field">
          <label>Importo (€)</label>
          <input type="number" id="ord-importo" placeholder="0.00" min="0" step="0.01">
        </div>
        <div class="form-field">
          <label>Data consegna</label>
          <input type="date" id="ord-consegna">
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label>Stato</label>
          <select id="ord-stato">
            <option value="confermato">Confermato</option>
            <option value="in_produzione">In produzione</option>
            <option value="spedito">Spedito</option>
            <option value="ritardo">In ritardo</option>
            <option value="annullato">Annullato</option>
          </select>
        </div>
        <div class="form-field">
          <label>Avanzamento (%)</label>
          <input type="number" id="ord-avanz" placeholder="0" min="0" max="100">
        </div>
      </div>
      <div class="form-section">Note</div>
      <div class="form-field">
        <textarea id="ord-note" placeholder="Note sull'ordine..."></textarea>
      </div>
    </div>
    <div class="form-modal-foot">
      <button class="btn" onclick="closeForm('form-ordine')">Annulla</button>
      <button class="btn btn-red" onclick="saveOrdine()">Salva ordine</button>
    </div>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast"></div>

<script>
const SUPABASE_URL = 'https://tvfpekldunmegzdjpact.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZnBla2xkdW5tZWd6ZGpwYWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxOTEzMjcsImV4cCI6MjA5MTc2NzMyN30.278_jYjYF77AO5i_bX8RHhoezdOdjMXBMyNd1n2Xdo4';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentSection = 'dashboard';
let currentUser = null;
let currentRuolo = null;      // ruolo principale
let currentRuoli = [];        // tutti i ruoli dell'utente
let currentPermessi = new Set();
let currentNomeUtente = null; // nome+cognome del compilatore

// ── DATE ──────────────────────────────────────────────
document.getElementById('topbar-date').textContent = new Date().toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});

// ── RUOLI ─────────────────────────────────────────────
const RUOLI_LABEL = {
  super_admin:'Super Admin', admin:'Admin',
  resp_commerciale:'Resp. Commerciale', resp_tecnico:'Resp. Tecnico',
  agente:'Agente', back_office:'Back Office',
  magazzino:'Magazzino', sola_lettura:'Sola lettura'
};

function haPerm(perm){ return isSuperAdmin() || currentPermessi.has(perm); }
function isAdmin(){ return currentRuoli.includes('admin')||currentRuoli.includes('super_admin'); }
function isSuperAdmin(){ return currentRuoli.includes('super_admin'); }
function isRespComm(){ return isSuperAdmin()||currentRuoli.includes('resp_commerciale')||currentRuoli.includes('back_office'); }
function isRespTec(){ return isSuperAdmin()||currentRuoli.includes('resp_tecnico'); }
function puoVedereAgenti(){ return isAdmin()||isRespComm()||currentRuoli.includes('agente'); }

async function loadRuolo(userId){
  try {
    const {data:ruoliUtente} = await sb.from('utenti_ruoli').select('codice_ruolo,nome,cognome').eq('user_id',userId);
    currentRuoli = (ruoliUtente||[]).map(r=>r.codice_ruolo);
    if(currentRuoli.length===0) currentRuoli=['agente'];
    currentRuolo = currentRuoli.includes('super_admin')?'super_admin':currentRuoli[0];
    // Salva nome compilatore
    const primoRuolo = ruoliUtente?.[0];
    currentNomeUtente = primoRuolo?.nome && primoRuolo?.cognome 
      ? primoRuolo.nome + ' ' + primoRuolo.cognome 
      : null;
    if(!isSuperAdmin() && currentRuoli.length>0){
      const {data:perms} = await sb.from('ruoli_permessi').select('permesso').in('codice_ruolo',currentRuoli);
      currentPermessi = new Set((perms||[]).map(p=>p.permesso));
    }
  } catch(e) {
    currentRuoli=['agente']; currentRuolo='agente';
  }
  const badge = document.getElementById('sb-ruolo-badge');
  if(badge) badge.textContent = currentRuoli.map(r=>RUOLI_LABEL[r]||r).join(', ');
  const adminSection = document.getElementById('sb-admin-section');
  if(adminSection) adminSection.style.display = isAdmin() ? 'block' : 'none';
  const utentiItem = document.getElementById('sb-item-utenti');
  if(utentiItem) utentiItem.style.display = isSuperAdmin() ? 'flex' : 'none';
}

// ── AUTH ──────────────────────────────────────────────
async function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  const err   = document.getElementById('login-error');
  const btn   = document.getElementById('login-btn');
  err.style.display='none';
  btn.textContent='Accesso in corso...'; btn.disabled=true;
  try {
    const {data,error} = await sb.auth.signInWithPassword({email,password:pass});
    btn.textContent='Accedi'; btn.disabled=false;
    if(error){
      err.textContent=error.message==='Invalid login credentials'?'Email o password non corretti':error.message;
      err.style.display='block';
      return;
    }
    currentUser=data.user;
    await loadRuolo(currentUser.id);
    entraNellApp(currentUser.email);
  } catch(e) {
    btn.textContent='Accedi'; btn.disabled=false;
    err.textContent='Errore: '+e.message;
    err.style.display='block';
  }
}
document.getElementById('login-password').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});

function entraNellApp(email){
  try {
    document.getElementById('login-screen').style.display='none';
    document.getElementById('app').classList.add('visible');
    const emailEl=document.getElementById('sb-user-email');
    if(emailEl) emailEl.textContent=email||'';
    loadSection('dashboard');
  } catch(e){
    console.error('Errore entraNellApp:',e);
  }
}

async function doLogout(){
  try { await sb.auth.signOut(); } catch(e){}
  currentRuolo=null; currentUser=null;
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('app').classList.remove('visible');
}

// Controlla sessione esistente al caricamento pagina (senza onAuthStateChange)
(async ()=>{
  try {
    const {data:{session}} = await sb.auth.getSession();
    if(session?.user){
      currentUser=session.user;
      await loadRuolo(currentUser.id);
      entraNellApp(currentUser.email);
    }
  } catch(e){
    console.error('Errore getSession:',e);
  }
})();

// ── NAVIGATION ────────────────────────────────────────
const pageInfo = {
  dashboard:{title:'Dashboard',bc:'Panoramica generale',action:false},
  anagrafiche:{title:'Anagrafiche',bc:'Clienti e fornitori',action:true,label:'+ Nuova anagrafica'},
  preventivi:{title:'Preventivi',bc:'Gestione offerte commerciali',action:false,label:''},
  ordini_vendita:{title:"Conferme d'ordine",bc:'Preventivi confermati e ordini diretti',action:false,label:''},
  fatture:{title:'Fatture',bc:'Ciclo attivo',action:false},
  magazzino:{title:'Magazzino',bc:'Giacenze e componenti',action:false},
  produzione:{title:'Produzione MRP',bc:'Ciclo produttivo',action:false},
  dipendenti:{title:'Dipendenti',bc:'Organico',action:false},
  admin:{title:'Catalogo prodotti',bc:'Configurazione e prezzi',action:false},
  utenti:{title:'Utenti e ruoli',bc:'Gestione accessi',action:true,label:'+ Nuovo utente'},
};

function nav(section, el){
  currentSection=section;
  document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
  const info=pageInfo[section]||{title:section,bc:'',action:false};
  document.getElementById('topbar-title').textContent=info.title;
  document.getElementById('topbar-bc').textContent=' · '+info.bc;
  const btn=document.getElementById('topbar-action');
  if(info.action){btn.style.display='block';btn.textContent=info.label||'+ Nuovo';}
  else btn.style.display='none';
  loadSection(section);
}

function openForm(){
  if(currentSection==='anagrafiche') openFormAnagrafica();
  else if(currentSection==='ordini') openFormOrdine();
}

function loadSection(s){
  if((s==='admin'||s==='utenti') && !isAdmin()){
    toast('Accesso non autorizzato','err'); return;
  }
  if(s==='utenti' && !isSuperAdmin()){
    toast('Accesso riservato al Super Admin','err'); return;
  }
  // Chiudi tutti i modal aperti quando si cambia sezione
  document.querySelectorAll('.form-overlay.open').forEach(m=>m.classList.remove('open'));
  const c=document.getElementById('main-content');
  c.innerHTML='<div class="loading"><div class="spinner"></div>Caricamento...</div>';
  if(s==='dashboard') renderDashboard();
  else if(s==='anagrafiche') renderAnagrafiche();
  else if(s==='preventivi') renderPreventivi();
  else if(s==='ordini_vendita') renderOrdiniDiretti();
  else if(s==='ordini') renderOrdini();
  else if(s==='fatture') renderFatture();
  else if(s==='magazzino') renderMagazzino();
  else if(s==='produzione') renderProduzione();
  else if(s==='dipendenti') renderDipendenti();
  else if(s==='admin') renderAdmin();
  else if(s==='utenti') renderUtenti();
}

// ── TOAST ─────────────────────────────────────────────
function toast(msg,type='ok'){
  const t=document.getElementById('toast');
  t.textContent=msg; t.className='toast '+type+' show';
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ── HELPERS ───────────────────────────────────────────
function badgeStato(s){
  const map={attivo:'bg',dormiente:'ba',prospect:'bb',nuovo:'bb',
    bozza:'ba',inviato:'bb',firmato:'bg',rifiutato:'bgr',non_concluso:'bgr',
    confermato:'bb',in_produzione:'ba',spedito:'bg',ritardo:'br',annullato:'bgr',
    emessa:'bb',pagata:'bg',scaduta:'br','in_scadenza':'ba',
    presente:'bg',ferie:'ba',malattia:'br',
    pianificato:'bb','in_corso':'ba',completato:'bg'};
  const labels={attivo:'Attivo',dormiente:'Dormiente',prospect:'Prospect',nuovo:'Nuovo',
    bozza:'Bozza',inviato:'Inviato',firmato:'Firmato',rifiutato:'Rifiutato',non_concluso:'Non concluso',
    confermato:'Confermato',in_produzione:'In produzione',spedito:'Spedito',ritardo:'In ritardo',annullato:'Annullato',
    emessa:'Emessa',pagata:'Pagata',scaduta:'Scaduta',in_scadenza:'In scadenza',
    presente:'Presente',ferie:'Ferie',malattia:'Malattia',
    pianificato:'Pianificato',in_corso:'In corso',completato:'Completato'};
  return \`<span class="badge \${map[s]||'bgr'}">\${labels[s]||s}</span>\`;
}
function fmtEuro(n){return n!=null?'€ '+Number(n).toLocaleString('it-IT',{minimumFractionDigits:2,maximumFractionDigits:2}):'—';}
function fmtData(d){return d?new Date(d).toLocaleDateString('it-IT'):'—';}
function pbar(v){return \`<div class="pbar"><div class="pfill" style="width:\${v||0}%"></div></div>\`;}

// ── DASHBOARD ─────────────────────────────────────────
async function renderDashboard(){
  const [anaRes,ordRes,fatRes,magRes] = await Promise.all([
    sb.from('anagrafiche').select('tipo,stato'),
    sb.from('ordini').select('stato,importo,created_at'),
    sb.from('fatture').select('stato,importo,data_scadenza'),
    sb.from('magazzino').select('giacenza,scorta_minima'),
  ]);
  const ana=anaRes.data||[]; const ord=ordRes.data||[];
  const fat=fatRes.data||[]; const mag=magRes.data||[];
  const clienti=ana.filter(a=>a.tipo==='cliente'||a.tipo==='entrambi').length;
  const fornitori=ana.filter(a=>a.tipo==='fornitore'||a.tipo==='entrambi').length;
  const ordAperti=ord.filter(o=>!['spedito','annullato'].includes(o.stato)).length;
  const fatturato=ord.filter(o=>o.stato!=='annullato').reduce((s,o)=>s+Number(o.importo||0),0);
  const sottoscorta=mag.filter(m=>Number(m.giacenza)<=Number(m.scorta_minima)).length;
  const fatScadute=fat.filter(f=>f.stato==='scaduta').length;

  document.getElementById('main-content').innerHTML=\`
  <div class="grid-4">
    <div class="metric"><div class="metric-label">Clienti attivi</div><div class="metric-value">\${clienti}</div></div>
    <div class="metric"><div class="metric-label">Fornitori</div><div class="metric-value">\${fornitori}</div></div>
    <div class="metric"><div class="metric-label">Ordini aperti</div><div class="metric-value">\${ordAperti}</div></div>
    <div class="metric"><div class="metric-label">Fatturato totale</div><div class="metric-value" style="font-size:16px">\${fmtEuro(fatturato)}</div></div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><span class="card-title">Ultimi ordini</span><button class="btn btn-sm" onclick="nav('ordini',document.querySelectorAll('.sb-item')[2])">Vedi tutti</button></div>
      <div id="dash-ordini"><div class="loading"><div class="spinner"></div></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Situazione</span></div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:0.5px solid var(--border)">
          <span style="font-size:13px">Articoli sotto scorta minima</span>
          <span class="badge \${sottoscorta>0?'br':'bg'}">\${sottoscorta}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:0.5px solid var(--border)">
          <span style="font-size:13px">Fatture scadute</span>
          <span class="badge \${fatScadute>0?'br':'bg'}">\${fatScadute}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0">
          <span style="font-size:13px">Ordini in ritardo</span>
          <span class="badge \${ord.filter(o=>o.stato==='ritardo').length>0?'br':'bg'}">\${ord.filter(o=>o.stato==='ritardo').length}</span>
        </div>
      </div>
    </div>
  </div>\`;
  const ultOrd=await sb.from('ordini').select('numero,stato,importo,data_consegna,anagrafica_id,anagrafiche(ragione_sociale)').order('created_at',{ascending:false}).limit(5);
  const rows=(ultOrd.data||[]).map(o=>\`<tr class="data-row"><td><strong>\${o.numero||'—'}</strong></td><td>\${o.anagrafiche?.ragione_sociale||'—'}</td><td>\${fmtEuro(o.importo)}</td><td>\${fmtData(o.data_consegna)}</td><td>\${badgeStato(o.stato)}</td></tr>\`).join('');
  document.getElementById('dash-ordini').innerHTML=\`<table><thead><tr><th>N°</th><th>Cliente</th><th>Importo</th><th>Consegna</th><th>Stato</th></tr></thead><tbody>\${rows||'<tr class="data-row"><td colspan="5" style="text-align:center;color:var(--mid);padding:20px">Nessun ordine ancora</td></tr>'}</tbody></table>\`;
}

// ── ANAGRAFICHE ───────────────────────────────────────
async function renderAnagrafiche(){
  const filter = document.getElementById('ana-filter-val')||null;
  let q = sb.from('anagrafiche').select('*').order('ragione_sociale');
  const {data,error} = await q;
  if(error){document.getElementById('main-content').innerHTML=\`<div class="card"><p style="color:var(--red)">Errore: \${error.message}</p></div>\`;return;}
  const rows=(data||[]).map(a=>\`
    <tr class="data-row" onclick="editAnagrafica('\${a.id}')">
      <td><strong>\${a.ragione_sociale}</strong></td>
      <td>\${a.partita_iva||'—'}</td>
      <td>\${a.codice_fiscale||'—'}</td>
      <td><span class="tag">\${a.tipo||'—'}</span>\${a.canale?\` <span class="tag">\${a.canale}</span>\`:''}</td>
      <td>\${a.citta||'—'}\${a.provincia?' ('+a.provincia+')':''}</td>
      <td>\${a.codice_sdi||a.pec_fatturazione?'<span class="badge bg">SDI OK</span>':'<span class="badge ba">Manca SDI</span>'}</td>
      <td>\${badgeStato(a.stato||'attivo')}</td>
    </tr>\`).join('');
  document.getElementById('main-content').innerHTML=\`
  <div class="card">
    <div class="card-header">
      <div style="display:flex;gap:8px;align-items:center">
        <span class="card-title">Clienti e fornitori</span>
        <span style="font-size:12px;color:var(--mid)">\${(data||[]).length} soggetti</span>
      </div>
      <div style="display:flex;gap:8px">
        <select class="btn btn-sm" onchange="filterAna(this.value)">
          <option value="">Tutti</option>
          <option value="cliente">Solo clienti</option>
          <option value="fornitore">Solo fornitori</option>
          <option value="entrambi">Clienti e fornitori</option>
        </select>
      </div>
    </div>
    <table>
      <thead><tr><th>Ragione sociale</th><th>Partita IVA</th><th>Cod. fiscale</th><th>Tipo / Canale</th><th>Città</th><th>SDI</th><th>Stato</th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="7" style="text-align:center;color:var(--mid);padding:24px;font-style:italic">Nessuna anagrafica ancora — clicca "+ Nuova anagrafica" per iniziare</td></tr>'}</tbody>
    </table>
  </div>\`;
}

async function filterAna(val){
  let q = sb.from('anagrafiche').select('*').order('ragione_sociale');
  if(val) q=q.eq('tipo',val);
  const {data} = await q;
  const rows=(data||[]).map(a=>\`
    <tr class="data-row" onclick="editAnagrafica('\${a.id}')">
      <td><strong>\${a.ragione_sociale}</strong></td>
      <td>\${a.partita_iva||'—'}</td>
      <td>\${a.codice_fiscale||'—'}</td>
      <td><span class="tag">\${a.tipo||'—'}</span>\${a.canale?\` <span class="tag">\${a.canale}</span>\`:''}</td>
      <td>\${a.citta||'—'}\${a.provincia?' ('+a.provincia+')':''}</td>
      <td>\${a.codice_sdi||a.pec_fatturazione?'<span class="badge bg">SDI OK</span>':'<span class="badge ba">Manca SDI</span>'}</td>
      <td>\${badgeStato(a.stato||'attivo')}</td>
    </tr>\`).join('');
  document.querySelector('#main-content tbody').innerHTML = rows||'<tr><td colspan="7" style="text-align:center;color:var(--mid);padding:24px;font-style:italic">Nessun risultato</td></tr>';
}

async function editAnagrafica(id){
  const {data} = await sb.from('anagrafiche').select('*').eq('id',id).single();
  if(data) openFormAnagrafica(data);
}

async function openFormAnagrafica(data){
  document.getElementById('form-ana-title').textContent = data?'Modifica anagrafica':'Nuova anagrafica';
  document.getElementById('ana-id').value = data?.id||'';

  // Carica agenti per la select
  const {data:agenti} = await sb.from('agenti').select('id,nome,cognome,percentuale_provvigione').eq('attivo',true).order('cognome');
  const agentiSel = document.getElementById('ana-agente-id');
  if(agentiSel){
    agentiSel.innerHTML='<option value="">— Nessun agente —</option>'+(agenti||[]).map(a=>\`<option value="\${a.id}" \${a.id===data?.agente_id?'selected':''}>\${a.cognome} \${a.nome} (\${a.percentuale_provvigione}%)</option>\`).join('');
  }

  const fields={
    'ana-tipo':data?.tipo||'','ana-canale':data?.canale||'','ana-natura':data?.natura_giuridica||'',
    'ana-ragione':data?.ragione_sociale||'','ana-piva':data?.partita_iva||'','ana-cf':data?.codice_fiscale||'',
    'ana-regime':data?.regime_fiscale||'ordinario','ana-rea':data?.codice_rea||'',
    'ana-indirizzo':data?.indirizzo||'','ana-cap':data?.cap||'','ana-citta':data?.citta||'',
    'ana-provincia':data?.provincia||'','ana-paese':data?.paese||'IT',
    'ana-sdi':data?.codice_sdi||'','ana-pec-fatt':data?.pec_fatturazione||'','ana-pec':data?.pec||'',
    'ana-iban':data?.iban||'','ana-bic':data?.bic_swift||'','ana-banca':data?.banca||'','ana-intestatario':data?.intestatario_conto||'',
    'ana-cin':data?.cin||'','ana-abi':data?.abi||'','ana-cab':data?.cab||'',
    'ana-email-principale':data?.email_principale||'','ana-telefono-principale':data?.telefono_principale||'','ana-cellulare-principale':data?.cellulare_principale||'',
    'ana-codice':data?.codice||'',
    'ana-referente':data?.referente||'','ana-email':data?.email||'','ana-email-ordini':data?.email_ordini||'','ana-telefono':data?.telefono||'',
    'ana-cellulare-referente':data?.cellulare_referente||'',
    'ana-pagamento':data?.condizioni_pagamento||'','ana-fido':data?.fido_commerciale||'',
    'ana-cat-forn':data?.categoria_fornitura||'','ana-leadtime':data?.lead_time_giorni||'','ana-valutazione':data?.valutazione||'',
    'ana-note':data?.note||''
  };
  Object.entries(fields).forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.value=val;});
  if(document.getElementById('ana-ritenuta')) document.getElementById('ana-ritenuta').checked=data?.ritenuta_acconto||false;
  if(document.getElementById('ana-split')) document.getElementById('ana-split').checked=data?.split_payment||false;
  if(document.getElementById('ana-sede-op')){document.getElementById('ana-sede-op').checked=data?.sede_op_diversa||false;toggleSedeOp();}
  if(data?.sede_op_indirizzo) document.getElementById('ana-so-indirizzo').value=data.sede_op_indirizzo;
  if(data?.sede_op_cap) document.getElementById('ana-so-cap').value=data.sede_op_cap;
  if(data?.sede_op_citta) document.getElementById('ana-so-citta').value=data.sede_op_citta;
  if(data?.sede_op_provincia) document.getElementById('ana-so-provincia').value=data.sede_op_provincia;

  // Aggiorna campi condizionali in base al tipo
  aggiornaCampiPerTipo(data?.tipo||'');
  anaTab('generale', document.querySelector('.form-tab'));
  const formEl = ensureModalInBody('form-anagrafica');
  formEl.classList.add('open');
}

function aggiornaCampiPerTipo(tipo){
  const fieldEmailOrdini = document.getElementById('field-email-ordini');
  if(fieldEmailOrdini){
    fieldEmailOrdini.style.display = (tipo==='fornitore'||tipo==='entrambi') ? '' : 'none';
  }
  const sezFornitore = document.getElementById('ana-section-fornitore');
  if(sezFornitore){
    sezFornitore.style.display = (tipo==='fornitore'||tipo==='entrambi') ? '' : 'none';
  }
}

async function generaCodiceAnagrafica(tipo){
  const prefisso = tipo==='cliente' ? 'C' : tipo==='fornitore' ? 'F' : 'CF';
  // Cerca il massimo codice esistente con questo prefisso
  const {data} = await sb.from('anagrafiche')
    .select('codice')
    .like('codice', prefisso + '-%')
    .order('codice', {ascending: false})
    .limit(20);
  let maxNum = 10500; // parte da 10501
  if(data && data.length){
    for(const row of data){
      const match = row.codice && row.codice.match(/-(\d+)$/);
      if(match){
        const n = parseInt(match[1]);
        if(n > maxNum) maxNum = n;
      }
    }
  }
  return prefisso + '-' + (maxNum + 1);
}

async function saveAnagrafica(){
  let valid=true;
  const req=['ana-tipo','ana-ragione'];
  req.forEach(id=>{const el=document.getElementById(id);const p=el.closest('.form-field');if(!el.value.trim()){p.classList.add('invalid');valid=false;}else p.classList.remove('invalid');});
  if(!valid){toast('Compila i campi obbligatori (contrassegnati con *)','err');anaTab('generale',document.querySelectorAll('.form-tab')[0]);return;}
  const payload={
    tipo:v('ana-tipo'),canale:v('ana-canale')||null,natura_giuridica:v('ana-natura')||null,
    ragione_sociale:v('ana-ragione'),partita_iva:v('ana-piva')||null,codice_fiscale:v('ana-cf')||null,
    regime_fiscale:v('ana-regime')||'ordinario',codice_rea:v('ana-rea')||null,
    ritenuta_acconto:document.getElementById('ana-ritenuta').checked,
    indirizzo:v('ana-indirizzo')||null,cap:v('ana-cap')||null,citta:v('ana-citta')||null,
    provincia:v('ana-provincia')||null,paese:v('ana-paese')||'IT',
    sede_op_diversa:document.getElementById('ana-sede-op').checked,
    sede_op_indirizzo:v('ana-so-indirizzo')||null,sede_op_cap:v('ana-so-cap')||null,sede_op_citta:v('ana-so-citta')||null,sede_op_provincia:(v('ana-so-provincia')||'').toUpperCase()||null,
    codice_sdi:v('ana-sdi')||null,pec_fatturazione:v('ana-pec-fatt')||null,pec:v('ana-pec')||null,
    split_payment:document.getElementById('ana-split').checked,
    iban:v('ana-iban')||null,bic_swift:v('ana-bic')||null,banca:v('ana-banca')||null,intestatario_conto:v('ana-intestatario')||null,
    cin:v('ana-cin')||null,abi:v('ana-abi')||null,cab:v('ana-cab')||null,
    email_principale:v('ana-email-principale')||null,telefono_principale:v('ana-telefono-principale')||null,cellulare_principale:v('ana-cellulare-principale')||null,
    codice: await (async()=>{
      const manuale = v('ana-codice');
      if(manuale) return manuale;
      const tipo = v('ana-tipo');
      if(!tipo) return null;
      // Solo per nuovi inserimenti (non update)
      const id = document.getElementById('ana-id').value;
      if(id) return null; // in update non sovrascrivere
      return await generaCodiceAnagrafica(tipo);
    })(),
    referente:v('ana-referente')||null,email:v('ana-email')||null,email_ordini:v('ana-email-ordini')||null,telefono:v('ana-telefono')||null,
    cellulare_referente:v('ana-cellulare-referente')||null,
    condizioni_pagamento:v('ana-pagamento')||null,fido_commerciale:v('ana-fido')||null,agente_id:v('ana-agente-id')||null,
    categoria_fornitura:v('ana-cat-forn')||null,lead_time_giorni:v('ana-leadtime')||null,
    valutazione:v('ana-valutazione')||null,note:v('ana-note')||null,stato:'attivo'
  };
  const id=document.getElementById('ana-id').value;
  let error;
  if(id){const r=await sb.from('anagrafiche').update(payload).eq('id',id);error=r.error;}
  else{const r=await sb.from('anagrafiche').insert([payload]);error=r.error;}
  if(error){toast('Errore: '+error.message,'err');return;}
  toast(id?'Anagrafica aggiornata':'Anagrafica salvata','ok');
  closeForm('form-anagrafica');
  renderAnagrafiche();
}

var _invioPayload=null,_invioDocId=null,_invioNumero=null;
async function buildPreventivoPayload(id){
  var r1=await sb.from('preventivi').select('*,anagrafiche(*),agenti:agente_id(nome,cognome)').eq('id',id).single();
  var doc=r1.data;if(!doc)return null;
  var r2=await sb.from('righe_preventivo').select('*').eq('preventivo_id',id).order('riga_numero',{ascending:true});
  var righe=r2.data||[];var an=doc.anagrafiche||{};var ag=doc.agenti||{};var sc1=doc.sconto1||0;
  return {documento:{tipo:'PREVENTIVO',numero:doc.numero||'',
    data:(doc.data_documento||doc.created_at||'').slice(0,10),
    data_modifica:(doc.updated_at||'').slice(0,10),
    compilatore:doc.nome_compilatore||doc.compilato_da||'',
    compilato_da:doc.nome_compilatore||doc.compilato_da||'',
    validita_giorni:doc.validita_giorni||30,riferimento_cliente:doc.riferimento_cliente||'',
    condizioni_pagamento:doc.condizioni_pagamento||an.condizioni_pagamento||'',
    trasporto:doc.trasporto||'',
    resa:doc.resa||'Franco fabbrica',note:doc.note||'',
    sconto1:sc1,totale_imponibile:doc.totale_imponibile||0,totale_netto:doc.totale_netto||0,
    ragione_sociale:an.ragione_sociale||'',indirizzo:an.indirizzo||'',
    cap:an.cap||'',citta:an.citta||'',provincia:an.provincia||'',paese:an.paese||'Italia',
    partita_iva:an.partita_iva||'',codice_fiscale:an.codice_fiscale||'',
    telefono:an.telefono_principale||an.telefono||'',cellulare:an.cellulare_principale||'',
    email1:an.email_principale||an.email||'',email_ordini:an.email_ordini||'',
    sdi:an.codice_sdi||'',pec:an.pec_fatturazione||an.pec||'',
    pec_fatturazione:an.pec_fatturazione||'',
    banca:an.banca||'',cin:an.cin||'',abi:an.abi||'',cab:an.cab||'',
    referente:an.referente||'',
    codice_cliente:an.codice||'',
    agente:ag.nome?(ag.nome+' '+ag.cognome):'',
    dest_nome:doc.indirizzo_destinazione?an.ragione_sociale:'',
    dest_indirizzo:doc.indirizzo_destinazione||'',dest_cap:doc.cap_destinazione||'',
    dest_citta:doc.citta_destinazione||'',dest_provincia:doc.provincia_destinazione||'',
    dest_paese:doc.paese_destinazione||'',
    dest_riferimenti:doc.riferimenti_destinazione||doc.referente_destinazione||''},
  cliente:{ragione_sociale:an.ragione_sociale||'',indirizzo:an.indirizzo||'',
    cap:an.cap||'',citta:an.citta||'',provincia:an.provincia||'',paese:an.paese||'Italia',
    partita_iva:an.partita_iva||'',codice_fiscale:an.codice_fiscale||'',
    telefono:an.telefono_principale||'',cellulare:an.cellulare_principale||'',
    email1:an.email_principale||'',email_ordini:an.email_ordini||'',
    sdi:an.codice_sdi||'',pec:an.pec_fatturazione||an.pec||'',
    pec_fatturazione:an.pec_fatturazione||'',banca:an.banca||'',
    cin:an.cin||'',abi:an.abi||'',cab:an.cab||'',
    referente:an.referente||'',telefono_referente:an.telefono||'',
    cellulare_referente:an.cellulare_referente||'',email_referente:an.email||'',
    codice_cliente:an.codice||'',
    agente:ag.nome?(ag.nome+' '+ag.cognome):'',
    dest_nome:doc.indirizzo_destinazione?an.ragione_sociale:'',
    dest_indirizzo:doc.indirizzo_destinazione||'',dest_cap:doc.cap_destinazione||'',
    dest_citta:doc.citta_destinazione||'',dest_provincia:doc.provincia_destinazione||'',
    dest_paese:doc.paese_destinazione||''},
  righe:righe.map(function(r,i){
    var tot=r.prezzo_totale_riga||r.prezzo_unitario||r.prezzo_base||0;
    return {posizione:String(i+1).padStart(3,'0'),
      larghezza:r.larghezza_mm||'',altezza:r.altezza_mm||'',
      spessore:r.spessore_mm||r.spessore_muro_mm||(r.spessore_muro_cm?r.spessore_muro_cm*10:''),
      senso:r.senso_apertura||'',
      codice_apertura:r.codice_apertura||'',
      apertura:r.nome_apertura||'',nome_apertura:r.nome_apertura||'',
      quantita:r.quantita||1,
      serie:r.nome_serie||'',nome_serie:r.nome_serie||'',
      nome_modello:r.nome_modello||'',modello:r.nome_modello||'',
      finitura:r.nome_finitura||'',
      tipologia:r.nome_apertura||'',
      spalla:r.codice_spalla||(r.spessore_muro_cm?r.spessore_muro_cm+'cm':''),
      ferramenta:r.nome_ferramenta||'',serratura:r.nome_serratura||'',
      maniglia:r.nome_maniglia||'',versione_maniglia:'',
      colore_maniglia:r.nome_colore_maniglia||'',vetro:r.nome_tipo_vetro||'',
      bugna:r.pannello_bugna||'',colore_inserto:r.nome_colore_alu||r.nome_colore_pietra||'',
      stanza:r.stanza||'',note_riga:r.note_riga||'',
      lavorazioni_extra:r.lavorazioni_extra||'',
      prezzo_base:r.prezzo_base||0,prezzo_finitura:r.prezzo_finitura||0,
      prezzo_apertura:r.prezzo_apertura||0,prezzo_telaio:r.prezzo_telaio||0,
      prezzo_ferramenta:r.prezzo_ferramenta||0,prezzo_maniglia:r.prezzo_maniglia||0,
      prezzo_serratura:r.prezzo_serratura||0,prezzo_vetro:r.prezzo_vetro||0,
      prezzo_bugna:r.prezzo_bugna||0,prezzo_extra:r.prezzo_extra_incisioni||0,
      prezzo_unitario:r.prezzo_unitario||0,prezzo_totale:r.prezzo_totale_riga||0,
      totale_riga_netto:tot?Math.round(tot*(1-sc1/100)*100)/100:0,
      sconto:sc1,kit_varsavia:r.kit_varsavia||'',kit_rim16:r.kit_rim16||'',
      fuori_misura_l:r.fuori_misura_l?'Si':'',fuori_misura_h:r.fuori_misura_h?'Si':'',
      immagine_url:r.immagine_url||''};
  })};
}
async function apriModalInvioPreventivo(docId){
  var r=await sb.from('preventivi').select('*,anagrafiche(*)').eq('id',docId).single();
  var doc=r.data;if(!doc){toast('Preventivo non trovato','err');return;}
  var an=doc.anagrafiche||{};
  var numero=doc.numero||'preventivo';
  var nome=an.ragione_sociale||'';
  var email=an.email_principale||an.email||'';
  var nl='\\n';
  var testo='Gentile '+nome+','+nl+nl+
    'in allegato trova il nostro preventivo n. '+numero+'.'+nl+nl+
    'Restiamo a Sua disposizione per qualsiasi chiarimento.'+nl+nl+
    'Cordiali saluti,'+nl+
    'Max Porte di Rimasti Massimilian'+nl+
    'Tel. 011 9084622'+nl+
    'info@maxporte.it';
  document.getElementById('invia-email-cc').value='';
  document.getElementById('invia-oggetto').value='Preventivo n. '+numero+' - Max Porte';
  document.getElementById('invia-testo').value=testo;
  _invioDocId=docId;_invioNumero=numero;
  _invioPayload=await buildPreventivoPayload(docId);
  var modal=ensureModalInBody('modal-invia-preventivo');
  modal.classList.add('open');
}
async function confermaInvioPreventivo(){
  var emailTo=document.getElementById('invia-email-to').value.trim();
  var oggetto=document.getElementById('invia-oggetto').value.trim();
  var testo=document.getElementById('invia-testo').value.trim();
  if(!emailTo||!oggetto||!testo){toast('Compila tutti i campi obbligatori','err');return;}
  if(!_invioPayload){toast('Errore: payload mancante','err');return;}
  var btn=document.getElementById('btn-invia-conferma');
  btn.disabled=true;btn.textContent='Invio in corso...';
  try{
    var resp=await fetch('/invia-preventivo',{method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({payload:_invioPayload,email_to:emailTo,
        email_cc:document.getElementById('invia-email-cc').value.trim(),
        oggetto:oggetto,testo:testo,numero_preventivo:_invioNumero})});
    var result=await resp.json();
    if(result.ok){
      await sb.from('preventivi').update({stato:'inviato',data_invio:new Date().toISOString()}).eq('id',_invioDocId);
      toast('Preventivo inviato a '+emailTo,'ok');
      closeForm('modal-invia-preventivo');
      renderPreventivoDetail(_invioDocId);
    }else{toast('Errore: '+result.error,'err');}
  }catch(e){toast('Errore: '+e.message,'err');}
  finally{btn.disabled=false;btn.textContent='Invia';}
}

function v(id){const el=document.getElementById(id);return el?el.value.trim():'';}

function anaTab(tab, el){
  ['generale','sede','sdi','banca','commerciale'].forEach(t=>{
    const s=document.getElementById('ana-tab-'+t);if(s)s.classList.add('section-hidden');
  });
  document.getElementById('ana-tab-'+tab).classList.remove('section-hidden');
  document.querySelectorAll('.form-tab').forEach(t=>t.classList.remove('active'));
  if(el) el.classList.add('active');
}

function toggleSedeOp(){
  const checked=document.getElementById('ana-sede-op').checked;
  const fields=document.getElementById('sede-op-fields');
  if(checked) fields.classList.remove('section-hidden');
  else fields.classList.add('section-hidden');
}

// ── ORDINI ────────────────────────────────────────────
async function renderOrdini(){
  const {data,error} = await sb.from('ordini').select('*,anagrafiche(ragione_sociale)').order('created_at',{ascending:false});
  if(error){document.getElementById('main-content').innerHTML=\`<div class="card"><p style="color:var(--red)">\${error.message}</p></div>\`;return;}
  const totale=(data||[]).filter(o=>o.stato!=='annullato').reduce((s,o)=>s+Number(o.importo||0),0);
  const rows=(data||[]).map(o=>\`
    <tr class="data-row" onclick="editOrdine('\${o.id}')">
      <td><strong>\${o.numero||'—'}</strong></td>
      <td>\${o.anagrafiche?.ragione_sociale||'—'}</td>
      <td>\${o.serie?\`<span class="tag">\${o.serie}</span>\`:'—'}</td>
      <td>\${o.quantita||'—'} pz</td>
      <td>\${fmtEuro(o.importo)}</td>
      <td>\${fmtData(o.data_consegna)}</td>
      <td>\${badgeStato(o.stato||'confermato')}</td>
      <td><div style="display:flex;align-items:center;gap:6px">\${pbar(o.avanzamento)}<span style="font-size:11px;color:var(--mid);min-width:28px">\${o.avanzamento||0}%</span></div></td>
    </tr>\`).join('');
  document.getElementById('main-content').innerHTML=\`
  <div class="grid-4" style="margin-bottom:16px">
    <div class="metric"><div class="metric-label">Totale ordini</div><div class="metric-value">\${(data||[]).length}</div></div>
    <div class="metric"><div class="metric-label">Aperti</div><div class="metric-value">\${(data||[]).filter(o=>!['spedito','annullato'].includes(o.stato)).length}</div></div>
    <div class="metric"><div class="metric-label">In ritardo</div><div class="metric-value" style="color:var(--red)">\${(data||[]).filter(o=>o.stato==='ritardo').length}</div></div>
    <div class="metric"><div class="metric-label">Valore totale</div><div class="metric-value" style="font-size:16px">\${fmtEuro(totale)}</div></div>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Ordini di vendita</span></div>
    <table>
      <thead><tr><th>N° Ordine</th><th>Cliente</th><th>Serie</th><th>Q.tà</th><th>Importo</th><th>Consegna</th><th>Stato</th><th>Avanzamento</th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:24px;font-style:italic">Nessun ordine ancora</td></tr>'}</tbody>
    </table>
  </div>\`;
}

async function openFormOrdine(data){
  const {data:clienti} = await sb.from('anagrafiche').select('id,ragione_sociale').order('ragione_sociale');
  const opts=(clienti||[]).map(c=>\`<option value="\${c.id}" \${data?.anagrafica_id===c.id?'selected':''}>\${c.ragione_sociale}</option>\`).join('');
  document.getElementById('ord-cliente').innerHTML='<option value="">Seleziona cliente...</option>'+opts;
  document.getElementById('form-ord-title').textContent = data?'Modifica ordine':'Nuovo ordine';
  document.getElementById('ord-id').value=data?.id||'';
  document.getElementById('ord-numero').value=data?.numero||'';
  document.getElementById('ord-serie').value=data?.serie||'';
  document.getElementById('ord-qty').value=data?.quantita||'';
  document.getElementById('ord-importo').value=data?.importo||'';
  document.getElementById('ord-consegna').value=data?.data_consegna||'';
  document.getElementById('ord-stato').value=data?.stato||'confermato';
  document.getElementById('ord-avanz').value=data?.avanzamento||0;
  document.getElementById('ord-note').value=data?.note||'';
  document.getElementById('form-ordine').classList.add('open');
}

async function editOrdine(id){
  const {data} = await sb.from('ordini').select('*').eq('id',id).single();
  if(data) openFormOrdine(data);
}

async function saveOrdine(){
  let valid=true;
  ['ord-numero','ord-cliente'].forEach(id=>{
    const el=document.getElementById(id);const p=el.closest('.form-field');
    if(!el.value.trim()){p.classList.add('invalid');valid=false;}else p.classList.remove('invalid');
  });
  if(!valid){toast('Compila i campi obbligatori','err');return;}
  const payload={
    numero:v('ord-numero'),anagrafica_id:v('ord-cliente')||null,
    serie:v('ord-serie')||null,quantita:parseInt(v('ord-qty'))||null,
    importo:parseFloat(v('ord-importo'))||null,data_consegna:v('ord-consegna')||null,
    stato:v('ord-stato')||'confermato',avanzamento:parseInt(v('ord-avanz'))||0,
    note:v('ord-note')||null
  };
  const id=document.getElementById('ord-id').value;
  let error;
  if(id){const r=await sb.from('ordini').update(payload).eq('id',id);error=r.error;}
  else{const r=await sb.from('ordini').insert([payload]);error=r.error;}
  if(error){toast('Errore: '+error.message,'err');return;}
  toast(id?'Ordine aggiornato':'Ordine salvato','ok');
  closeForm('form-ordine');
  renderOrdini();
}

// ── FATTURE ───────────────────────────────────────────
async function renderFatture(){
  const {data} = await sb.from('fatture').select('*,anagrafiche(ragione_sociale),ordini(numero)').order('created_at',{ascending:false});
  const rows=(data||[]).map(f=>\`
    <tr class="data-row">
      <td><strong>\${f.numero||'—'}</strong></td>
      <td>\${f.anagrafiche?.ragione_sociale||'—'}</td>
      <td>\${f.ordini?.numero||'—'}</td>
      <td>\${fmtData(f.data_emissione)}</td>
      <td>\${fmtData(f.data_scadenza)}</td>
      <td>\${fmtEuro(f.importo)}</td>
      <td>\${f.iva_percentuale||22}%</td>
      <td>\${badgeStato(f.stato||'emessa')}</td>
    </tr>\`).join('');
  const tot=(data||[]).reduce((s,f)=>s+Number(f.importo||0),0);
  const pagate=(data||[]).filter(f=>f.stato==='pagata').reduce((s,f)=>s+Number(f.importo||0),0);
  document.getElementById('main-content').innerHTML=\`
  <div class="grid-4" style="margin-bottom:16px">
    <div class="metric"><div class="metric-label">Totale emesso</div><div class="metric-value" style="font-size:16px">\${fmtEuro(tot)}</div></div>
    <div class="metric"><div class="metric-label">Incassato</div><div class="metric-value" style="font-size:16px">\${fmtEuro(pagate)}</div></div>
    <div class="metric"><div class="metric-label">Da incassare</div><div class="metric-value" style="font-size:16px">\${fmtEuro(tot-pagate)}</div></div>
    <div class="metric"><div class="metric-label">Scadute</div><div class="metric-value" style="color:var(--red)">\${(data||[]).filter(f=>f.stato==='scaduta').length}</div></div>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Registro fatture</span></div>
    <table>
      <thead><tr><th>N° Fattura</th><th>Cliente</th><th>Ordine</th><th>Emissione</th><th>Scadenza</th><th>Importo</th><th>IVA</th><th>Stato</th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:24px;font-style:italic">Nessuna fattura ancora</td></tr>'}</tbody>
    </table>
  </div>\`;
}

// ── MAGAZZINO ─────────────────────────────────────────
// ============================================================
// MOTORE DISTINTA DINAMICA - MPX Gestionale
// Funzioni client-side (browser JS)
// ============================================================

// ── ENTRY POINT ─────────────────────────────────────────────
// cfg = oggetto CFG del configuratore
// sb  = client Supabase
// Ritorna: { componenti: [...], errori: [...] }

async function calcolaDistinta(cfg, sb) {
  const errori = [];
  const componenti = [];

  // 1. Trova tutte le regole che matchano, ordinate per specificità
  const regole = await trovaRegole(cfg, sb);
  if (!regole.length) {
    return { componenti: [], errori: [\'Nessuna regola distinta trovata per questa configurazione\'] };
  }

  // 2. Applica ereditarietà -- costruisce lista componenti finale
  const compsFinali = applicaEreditarieta(regole);

  // 2b. Pre-calcola L_anta/H_anta dalla misura reale in magazzino
  var antaComp = compsFinali.find(function(c){return c.codice_componente==='ANTA';});
  if(antaComp && antaComp.formula_larghezza){
    var varsBase = costruisciVariabili(cfg);
    var lAntaCalc = valutaFormula(antaComp.formula_larghezza, varsBase);
    var hAntaCalc = antaComp.formula_altezza ? valutaFormula(antaComp.formula_altezza, varsBase) : 0;
    var antaQ = sb.from('magazzino').select('larghezza_mm,altezza_mm').gt('giacenza',0).order('created_at',{ascending:true});
    if(antaComp.categoria_mp) antaQ=antaQ.eq('categoria',antaComp.categoria_mp);
    if(cfg.finitura) antaQ=antaQ.eq('codice_finitura',cfg.finitura);
    if(lAntaCalc) antaQ=antaQ.gte('larghezza_mm',lAntaCalc);
    if(hAntaCalc) antaQ=antaQ.gte('altezza_mm',hAntaCalc);
    var antaRes = await antaQ.limit(1).maybeSingle();
    cfg._larghezza_reale_anta = antaRes&&antaRes.data ? antaRes.data.larghezza_mm : lAntaCalc;
    cfg._altezza_reale_anta = antaRes&&antaRes.data ? antaRes.data.altezza_mm : hAntaCalc;
  }

  // 3. Per ogni componente, valuta condizione, calcola misure e trova articolo
  for (const comp of compsFinali) {
    // Valuta condizione (es. ha_vetro, ha_inserto_alluminio)
    if (comp.condizione && !valutaCondizione(comp.condizione, cfg)) {
      continue; // componente non applicabile a questa configurazione
    }

    try {
      const risultato = await elaboraComponente(comp, cfg, sb);
      if (risultato) componenti.push(risultato);
    } catch (e) {
      errori.push('Componente ' + (comp.codice_componente || comp.descrizione) + ': ' + e.message);
    }
  }

  return { componenti, errori };
}

// ── TROVA REGOLE ─────────────────────────────────────────────
async function trovaRegole(cfg, sb) {
  const { data: tutte } = await sb
    .from(\'distinta_regole\')
    .select(\'*, distinta_componenti(*)\')
    .eq(\'attiva\', true);

  if (!tutte) return [];

  // Filtra le regole che matchano la configurazione
  const matching = tutte.filter(r => {
    if (r.codice_serie && r.codice_serie !== cfg.serie) return false;
    if (r.codice_modello && r.codice_modello !== (cfg.modello||cfg.codice_modello)) return false;
    if (r.tipologia && r.tipologia !== (cfg.apertura||cfg.tipologia)) return false;
    if (r.codice_finitura && r.codice_finitura !== cfg.finitura) return false;
    if (r.colore_ferramenta && r.colore_ferramenta !== cfg.colore_ferramenta) return false;
    return true;
  });

  // Ordina per specificità crescente (dalla più generica alla più specifica)
  // Specificità = numero di condizioni non null
  matching.sort((a, b) => {
    const specA = [a.codice_serie, a.codice_modello, a.tipologia, a.codice_finitura, a.colore_ferramenta].filter(Boolean).length;
    const specB = [b.codice_serie, b.codice_modello, b.tipologia, b.codice_finitura, b.colore_ferramenta].filter(Boolean).length;
    return specA - specB;
  });

  return matching;
}

// ── EREDITARIETÀ ─────────────────────────────────────────────
// Partendo dalla regola più generica, le regole più specifiche
// sovrascrivono i componenti con lo stesso codice_componente
function applicaEreditarieta(regole) {
  const mappa = new Map(); // codice_componente -> componente

  for (const regola of regole) {
    const comps = (regola.distinta_componenti || [])
      .sort((a, b) => (a.ordine || 0) - (b.ordine || 0));

    for (const comp of comps) {
      const chiave = comp.codice_componente || comp.id;
      mappa.set(chiave, comp);
    }
  }

  return Array.from(mappa.values());
}

// ── VALUTA CONDIZIONE ────────────────────────────────────────
function valutaCondizione(condizione, cfg) {
  if (!condizione) return true;
  const flags = cfg._flags || {};
  // Supporta: ha_vetro, ha_inserto_alluminio, ha_pannello_o_bugna, ecc.
  if (condizione in flags) return !!flags[condizione];
  // Supporta: ha_zoccoli (per pannelli blindati)
  if (condizione === \'ha_zoccoli\') return (cfg._zoccoliAuto || 0) > 0;
  // Supporta: taglio_larghezza (se l\'anta viene tagliata in larghezza)
  if (condizione === \'taglio_larghezza\') return cfg._taglio_larghezza || false;
  return true;
}

// ── ELABORA COMPONENTE ───────────────────────────────────────
async function elaboraComponente(comp, cfg, sb) {
  // Variabili disponibili per le formule
  const vars = costruisciVariabili(cfg);

  const qta = valutaFormula(comp.formula_qta || \'1\', vars);
  const lFinita = comp.formula_larghezza ? valutaFormula(comp.formula_larghezza, vars) : null;
  const hFinita = comp.formula_altezza ? valutaFormula(comp.formula_altezza, vars) : null;
  const lTaglio = comp.formula_larghezza_taglio ? valutaFormula(comp.formula_larghezza_taglio, vars) : lFinita;
  const hTaglio = comp.formula_altezza_taglio ? valutaFormula(comp.formula_altezza_taglio, vars) : hFinita;

  let articolo = null;
  let codice_mp = null;
  let descrizione_mp = null;

  if (comp.tipo_ricerca === \'codice_fisso\') {
    // Cerca direttamente per codice MP
    const { data } = await sb.from(\'magazzino\')
      .select(\'id, codice_mp, descrizione, giacenza, codice_finitura\')
      .eq(\'codice_mp\', comp.codice_mp)
      .gt(\'giacenza\', 0)
      .order(\'created_at\', { ascending: true })
      .limit(1)
      .maybeSingle();
    articolo = data;
    codice_mp = comp.codice_mp;
    descrizione_mp = comp.descrizione;

  } else if (comp.tipo_ricerca === \'query_magazzino\') {
    // Determina il colore da cercare
    const colore = determinaColore(comp.colore_da, cfg);

    // Query base
    let query = sb.from(\'magazzino\')
      .select(\'id, codice_mp, descrizione, giacenza, larghezza_mm, altezza_mm, codice_finitura, created_at\')
      .gt(\'giacenza\', 0)
      .order(\'created_at\', { ascending: true }); // FIFO

    if (comp.categoria_mp) query = query.eq(\'categoria\', comp.categoria_mp);
    if (colore) query = query.eq(\'codice_finitura\', colore);

    // Filtro per prefisso codice (per viti, copricerniere, ecc.)
    if (comp.codice_mp) {
      query = query.ilike(\'codice_mp\', comp.codice_mp + \'%\');
    }

    // Filtro dimensioni (FIFO su articoli compatibili)
    if (lTaglio) query = query.gte(\'larghezza_mm\', lTaglio);
    if (hTaglio) query = query.gte(\'altezza_mm\', hTaglio);

    const { data } = await query.limit(1).maybeSingle();
    articolo = data;
    if (articolo) {
      codice_mp = articolo.codice_mp;
      descrizione_mp = articolo.descrizione || comp.descrizione;
    }

  } else if (comp.tipo_ricerca === \'dal_configuratore\') {
    var codiceConf = determinaDalConfiguratoreCode(comp.codice_componente, cfg);
    descrizione_mp = comp.descrizione;
    var colore2 = determinaColore(comp.colore_da, cfg);
    var query2 = sb.from(\'magazzino\')
      .select(\'id, codice_mp, descrizione, giacenza, larghezza_mm, altezza_mm, codice_finitura\')
      .gt(\'giacenza\', 0)
      .order(\'created_at\', { ascending: true });
    if (comp.categoria_mp) query2 = query2.eq(\'categoria\', comp.categoria_mp);
    if (codiceConf) query2 = query2.ilike(\'codice_mp\', codiceConf + \'%\');
    if (comp.codice_mp) query2 = query2.ilike(\'codice_mp\', comp.codice_mp + \'%\');
    if (colore2) query2 = query2.eq(\'codice_finitura\', colore2);
    var res2 = await query2.limit(1).maybeSingle();
    articolo = res2 ? res2.data : null;
    if (articolo) {
      codice_mp = articolo.codice_mp;
      descrizione_mp = articolo.descrizione || comp.descrizione;
    }
  }

  // Calcola misure reali anta (usa misure dell\'articolo trovato se disponibili)
  const lReale = articolo?.larghezza_mm || lFinita;
  const hReale = articolo?.altezza_mm || hFinita;

  // Determina se serve taglio
  const taglio_larghezza = lReale && lFinita && lReale > lFinita;
  const taglio_altezza = hReale && hFinita && hReale > hFinita;

  return {
    codice_componente: comp.codice_componente,
    descrizione: descrizione_mp || comp.descrizione,
    codice_mp,
    codice_finitura: articolo?.codice_finitura || null,
    magazzino_id: articolo?.id || null,
    qta: Math.round(qta * 1000) / 1000,
    unita: comp.unita || \'pz\',
    // Misure
    larghezza_finita: lFinita,
    altezza_finita: hFinita,
    larghezza_reale: lReale,
    altezza_reale: hReale,
    // Taglio
    richiede_taglio_larghezza: taglio_larghezza,
    richiede_taglio_altezza: taglio_altezza,
    larghezza_taglio: taglio_larghezza ? (lTaglio || lFinita) : null,
    altezza_taglio: taglio_altezza ? (hTaglio || hFinita) : null,
    // Disponibilità
    disponibile: !!articolo,
    giacenza: articolo?.giacenza || 0,
    // Meta
    note: comp.note,
  };
}

// ── VARIABILI PER FORMULE ────────────────────────────────────
function costruisciVariabili(cfg) {
  return {
    L: cfg.larghezza || 0,
    H: cfg.altezza || 0,
    S: cfg.spessore_muro || 0,
    L_anta: cfg._larghezza_reale_anta || (cfg.larghezza || 0),
    H_anta: cfg._altezza_reale_anta || (cfg.altezza || 0),
    SFRIDO: 1.05,
    ZOC: cfg._zoccoliAuto || 0,
  };
}

// ── VALUTA FORMULA ───────────────────────────────────────────
function valutaFormula(formula, vars) {
  if (!formula) return 1;
  var expr = formula.replace(/,/g, '.');
  var keys = Object.keys(vars).sort(function(a,b){return b.length-a.length;});
  for (var i=0; i<keys.length; i++) {
    expr = expr.split(keys[i]).join(String(vars[keys[i]]));
  }
  try {
    return Function(\'return (\' + expr + \')\')();
  } catch (e) {
    console.error(\'Errore formula:\', formula, e);
    return 0;
  }
}

// ── DETERMINA COLORE ─────────────────────────────────────────
function determinaColore(colore_da, cfg) {
  if (!colore_da || colore_da === \'nessuno\') return null;
  if (colore_da === \'finitura\') return cfg.finitura || null;
  if (colore_da === \'ferramenta\') return cfg.colore_ferramenta || null;
  if (colore_da === \'inserto\') return cfg.colore_inserto || null;
  if (colore_da === \'dal_configuratore\') return cfg.finitura || null;
  return null;
}

// ── DETERMINA CODICE DAL CONFIGURATORE ──────────────────────
function determinaDalConfiguratoreCode(codice_componente, cfg) {
  if (codice_componente === \'TELAIO\') return cfg.telaio || null;
  if (codice_componente === \'SERRATURA\') return null;
  if (codice_componente === \'MANIGLIA\') return null;
  return null;
}


async function anteprimaDistinta(){
  const body=document.getElementById(\'modal-distinta-body\');
  body.innerHTML=\'<div style="text-align:center;padding:20px;color:var(--mid)">Calcolo in corso...</div>\';
  const mo=ensureModalInBody(\'modal-distinta\');if(mo)mo.classList.add(\'open\');
  const {componenti,errori}=await calcolaDistinta(CFG,sb);
  if(errori.length&&!componenti.length){
    body.innerHTML=\'<div style="color:var(--red);padding:16px">\'+errori.map(function(e){return \'<p>\'+e+\'</p>\';}).join(\'\')+ \'</div>\';
    return;
  }
  var rows=componenti.map(function(c){
    var stato=c.disponibile
      ?\'<span class="badge bg">Disponibile (\'+c.giacenza+\')</span>\'
      :\'<span class="badge br">Non disponibile</span>\';
    var taglio=\'\';
    if(c.richiede_taglio_larghezza||c.richiede_taglio_altezza){
      taglio=\'<br><small style="color:var(--amber-tx)">Taglio: \'+
        ( c.larghezza_taglio?c.larghezza_taglio+\'mm\':c.larghezza_finita+\'mm\')+\' x \'+
        ( c.altezza_taglio?c.altezza_taglio+\'mm\':c.altezza_finita+\'mm\')+\'</small>\';
    }
    var misure=\'\';
    if(c.larghezza_reale||c.altezza_reale){
      misure=\'<br><small style="color:var(--mid)">\'+(c.larghezza_reale||\'-\')+\' x \'+( c.altezza_reale||\'-\')+\' mm</small>\';
    }
    return \'<tr>\'+
      \'<td>\'+( c.codice_mp||\' &mdash; \')+\'</td>\'+
      \'<td>\'+c.descrizione+misure+taglio+\'</td>\'+
      \'<td style="text-align:right"><strong>\'+( typeof c.qta===\'number\'?c.qta.toLocaleString(\'it-IT\',{maximumFractionDigits:2}):c.qta)+\'</strong> \'+c.unita+\'</td>\'+
      \'<td>\'+stato+\'</td>\'+
      \'</tr>\';
  }).join(\'\');
  var erroriHtml=errori.length?\'<div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px;margin-bottom:12px;font-size:12px">\'+
    errori.map(function(e){return \'<p style="margin:2px 0;color:var(--amber-tx)">⚠ \'+e+\'</p>\';}).join(\'\')+ \'</div>\':  \'\'
  body.innerHTML=erroriHtml+
    \'<table style="width:100%"><thead><tr>\'+
    \'<th>Codice MP</th><th>Descrizione</th><th>Colore</th><th>Q.t&agrave;</th><th>Disponibilit&agrave;</th>\'+
    \'</tr></thead><tbody>\'+rows+\'</tbody></table>\';
}

async function renderMagazzino(){
  const {data:cats}=await sb.from(\'categorie_magazzino\').select(\'*\').order(\'nome\');
  const {data}=await sb.from(\'magazzino\').select(\'*\').order(\'categoria\').order(\'descrizione\');
  const items=data||[];
  const sottoscorta=items.filter(function(m){return Number(m.giacenza||0)<=Number(m.scorta_minima||0);}).length;
  const pannelli=items.filter(function(m){return m.categoria===\'PAN-BL\';}).length;
  const rows=items.map(function(m){
    const s=Number(m.giacenza||0)<=Number(m.scorta_minima||0);
    const dim=(m.altezza_mm||m.larghezza_mm)?(m.altezza_mm||\'?\')+\' x \'+(m.larghezza_mm||\'?\')+\' mm\':\'\xe2\x80\x94\';
    const catNome=(cats||[]).find(function(c){return c.codice===m.categoria;})?.nome||m.categoria||\'\xe2\x80\x94\';
    return \'<tr class="data-row" onclick="apriDettaglioMagazzino(this.dataset.id)" data-id="\'+m.id+\'" style="cursor:pointer">\'+
      \'<td><strong>\'+(m.codice_mp||\'\xe2\x80\x94\')+\'</strong></td>\'+
      \'<td>\'+(m.descrizione||\'\xe2\x80\x94\')+\'</td>\'+
      \'<td>\'+(catNome?\'<span class="tag">\'+catNome+\'</span>\':\'\xe2\x80\x94\')+\'</td>\'+
      \'<td>\'+(m.codice_finitura?\'<span class="tag">\'+m.codice_finitura+\'</span>\':\'\xe2\x80\x94\')+\'</td>\'+
      \'<td>\'+dim+\'</td><td>\'+(m.giacenza||0)+\' \'+(m.unita||\'pz\')+\'</td>\'+
      \'<td>\'+(m.scorta_minima||0)+\'</td>\'+
      \'<td>\'+(s?\'<span class="badge br">Sotto scorta</span>\':\'<span class="badge bg">OK</span>\')+\'</td>\'+
      \'<td style="text-align:right"><div style="display:flex;gap:4px;justify-content:flex-end">\'+
        \'<button class="btn btn-sm" title="Modifica" data-mid="\'+m.id+\'" onclick="event.stopPropagation();apriDettaglioMagazzino(this.dataset.mid)" style="padding:4px 6px">\'+
        \'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>\'+
        \'<button class="btn btn-sm" title="Duplica" data-mid="\'+m.id+\'" onclick="event.stopPropagation();duplicaArticoloMag(this.dataset.mid)" style="padding:4px 6px">\'+
        \'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>\'+
        \'</div></td></tr>\';
  }).join(\'\');
  document.getElementById(\'main-content\').innerHTML=
    \'<div class="grid-4" style="margin-bottom:16px">\'+
    \'<div class="metric"><div class="metric-label">Articoli totali</div><div class="metric-value">\'+items.length+\'</div></div>\'+
    \'<div class="metric"><div class="metric-label">Pannelli blindati</div><div class="metric-value">\'+pannelli+\'</div></div>\'+
    \'<div class="metric"><div class="metric-label">Sotto scorta</div><div class="metric-value" style="color:var(--red)">\'+sottoscorta+\'</div></div>\'+
    \'</div><div class="card"><div class="card-header"><span class="card-title">Magazzino</span>\'+
    \'<button class="btn btn-red btn-sm" onclick="apriNuovoArticoloMag()">+ Nuovo articolo</button></div>\'+
    \'<table><thead><tr><th>Codice MP</th><th>Descrizione</th><th>Categoria</th><th>Colore</th>\'+
    \'<th>Dim.</th><th>Giacenza</th><th>Scorta min.</th><th>Stato</th><th></th></tr></thead>\'+
    \'<tbody>\'+(rows||\'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:24px">Nessun articolo</td></tr>\')+
    \'</tbody></table></div>\';
}

async function apriDettaglioMagazzino(id){
  const {data:m}=await sb.from(\'magazzino\').select(\'*\').eq(\'id\',id).single();
  if(!m){toast(\'Non trovato\',\'err\');return;}
  _magEditId=id;
  await popolaFormMag(m);
  // Carica fornitori e movimenti
  const fSec=document.getElementById(\'mag-fornitori-section\');
  const mSec=document.getElementById(\'mag-movimenti-section\');
  if(fSec) fSec.style.display=\'block\';
  if(mSec) mSec.style.display=\'block\';
  await caricaFornitori(id);
  await caricaMovimenti(id);
  const mo=ensureModalInBody(\'modal-magazzino\');if(mo)mo.classList.add(\'open\');
}

function apriNuovoArticoloMag(){
  _magEditId=null;
  popolaFormMag({});
  const fSec=document.getElementById(\'mag-fornitori-section\');
  const mSec=document.getElementById(\'mag-movimenti-section\');
  if(fSec) fSec.style.display=\'none\';
  if(mSec) mSec.style.display=\'none\';
  const mo=ensureModalInBody(\'modal-magazzino\');if(mo)mo.classList.add(\'open\');
}

async function popolaFormMag(m){
  document.getElementById(\'mag-title\').textContent=_magEditId?\'Modifica\':\'Nuovo articolo\';
  // Carica categorie
  const {data:cats}=await sb.from(\'categorie_magazzino\').select(\'*\').order(\'nome\');
  const catSel=document.getElementById(\'mag-categoria\');
  if(catSel){
    catSel.innerHTML=\'<option value="">&#8212;</option>\'+
      (cats||[]).map(function(c){return \'<option value="\'+c.codice+\'" data-descr="\'+( c.descrizione||\'\')+\'"\'+(m.categoria===c.codice?\' selected\':\'\')+\'>\'+c.nome+\'</option>\';}).join(\'\');
  }
  // Carica colori in base ai flag della categoria
  var catCodice=m.categoria||\'\';
  var catInfo=null;
  if(catCodice){
    const {data:catRow}=await sb.from(\'categorie_magazzino\').select(\'colori_laminato,colori_laccato,colori_ferramenta\').eq(\'codice\',catCodice).maybeSingle();
    catInfo=catRow;
  }
  var finsUnique=[];
  if(catInfo&&(catInfo.colori_laminato||catInfo.colori_laccato)){
    var fasce=[];
    if(catInfo.colori_laminato) fasce.push(\'LAMINATO\');
    if(catInfo.colori_laccato) fasce=fasce.concat([\'MP CLASSIC\',\'MP LIGHT\',\'MP PREMIUM\']);
    const {data:fins2}=await sb.from(\'finiture\').select(\'codice_finitura,nome_finitura\').in(\'fascia\',fasce).order(\'nome_finitura\');
    const seen=new Set();
    (fins2||[]).forEach(function(f){if(!seen.has(f.codice_finitura)){seen.add(f.codice_finitura);finsUnique.push({codice_finitura:f.codice_finitura,nome_finitura:f.nome_finitura});}});
  }
  if(catInfo&&catInfo.colori_ferramenta){
    const {data:ferr}=await sb.from(\'ferramenta\').select(\'codice,nome\').eq(\'attivo\',true).order(\'nome\');
    (ferr||[]).forEach(function(f){finsUnique.push({codice_finitura:f.codice,nome_finitura:f.nome});});
  }
  if(!catInfo||(!catInfo.colori_laminato&&!catInfo.colori_laccato&&!catInfo.colori_ferramenta)){
    const {data:fins3}=await sb.from(\'finiture\').select(\'codice_finitura,nome_finitura\').order(\'nome_finitura\');
    const seen2=new Set();
    (fins3||[]).forEach(function(f){if(!seen2.has(f.codice_finitura)){seen2.add(f.codice_finitura);finsUnique.push(f);}});
  }
  const finSel=document.getElementById(\'mag-codice_finitura\');
  if(finSel){
    finSel.innerHTML=\'<option value="">&mdash; Nessuna &mdash;</option>\'+
      finsUnique.map(function(f){return \'<option value="\'+f.codice_finitura+\'" data-nome="\'+f.nome_finitura+\'"\'+( m.codice_finitura===f.codice_finitura?\' selected\':\'\')+\'>\'+f.codice_finitura+\' - \'+f.nome_finitura+\'</option>\';}).join(\'\');
    aggiornaFinMag(finSel);
  }
  const ff={\'mag-codice_mp\':m.codice_mp||\'\',\'mag-descrizione\':m.descrizione||\'\',
    \'mag-altezza_mm\':m.altezza_mm||\'\',\'mag-larghezza_mm\':m.larghezza_mm||\'\',\'mag-spessore_mm\':m.spessore_mm||\'\',
    \'mag-giacenza\':m.giacenza||0,\'mag-scorta_minima\':m.scorta_minima||0,\'mag-scorta_target\':m.scorta_target||0,
    \'mag-pz_per_confezione\':m.pz_per_confezione||1,\'mag-unita\':m.unita||\'pz\',
    \'mag-unita_ordine\':m.unita_ordine||\'pz\',\'mag-ubicazione\':m.ubicazione||\'\'};
  Object.entries(ff).forEach(function(kv){const el=document.getElementById(kv[0]);if(el)el.value=kv[1];});
  const btn=document.getElementById(\'mag-btn-elimina\');if(btn)btn.style.display=_magEditId?\'\':\'none\';
  if(!m.codice_mp) aggiornaCodiceMP(false);
}

async function aggiornaColoriMag(){
  const catSel=document.getElementById(\'mag-categoria\');
  if(!catSel) return;
  const m={categoria:catSel.value,codice_finitura:document.getElementById(\'mag-codice_finitura\')?.value||\'\'  };
  var catInfo=null;
  if(m.categoria){
    const {data:catRow}=await sb.from(\'categorie_magazzino\').select(\'colori_laminato,colori_laccato,colori_ferramenta\').eq(\'codice\',m.categoria).maybeSingle();
    catInfo=catRow;
  }
  var finsUnique=[];
  if(catInfo&&(catInfo.colori_laminato||catInfo.colori_laccato)){
    var fasce=[];
    if(catInfo.colori_laminato) fasce.push(\'LAMINATO\');
    if(catInfo.colori_laccato) fasce=fasce.concat([\'MP CLASSIC\',\'MP LIGHT\',\'MP PREMIUM\']);
    const {data:fins2}=await sb.from(\'finiture\').select(\'codice_finitura,nome_finitura\').in(\'fascia\',fasce).order(\'nome_finitura\');
    const seen=new Set();
    (fins2||[]).forEach(function(f){if(!seen.has(f.codice_finitura)){seen.add(f.codice_finitura);finsUnique.push({codice_finitura:f.codice_finitura,nome_finitura:f.nome_finitura});}});
  }
  if(catInfo&&catInfo.colori_ferramenta){
    const {data:ferr}=await sb.from(\'ferramenta\').select(\'codice,nome\').eq(\'attivo\',true).order(\'nome\');
    (ferr||[]).forEach(function(f){finsUnique.push({codice_finitura:f.codice,nome_finitura:f.nome});});
  }
  if(!catInfo||(!catInfo.colori_laminato&&!catInfo.colori_laccato&&!catInfo.colori_ferramenta)){
    const {data:fins3}=await sb.from(\'finiture\').select(\'codice_finitura,nome_finitura\').order(\'nome_finitura\');
    const seen2=new Set();
    (fins3||[]).forEach(function(f){if(!seen2.has(f.codice_finitura)){seen2.add(f.codice_finitura);finsUnique.push(f);}});
  }
  const finSel=document.getElementById(\'mag-codice_finitura\');
  if(finSel){
    var curVal=finSel.value;
    var opts=\'<option value="">&mdash; Nessuna &mdash;</option>\'+
      finsUnique.map(function(f){
        var sel=f.codice_finitura===curVal?\' selected\':\'\';
        return \'<option value="\'+f.codice_finitura+\'" data-nome="\'+f.nome_finitura+\'"\'+sel+\'>\'+ f.codice_finitura+\' - \'+f.nome_finitura+\'</option>\';
      }).join(\'\');
    finSel.innerHTML=opts;
    aggiornaFinMag(finSel);
  }
}

function aggiornaFinMag(sel){
  const opt=sel.options[sel.selectedIndex];
  const nomeEl=document.getElementById(\'mag-nome_finitura\');
  if(nomeEl) nomeEl.value=(opt&&opt.value)?opt.getAttribute(\'data-nome\')||\'\':\'\';
}

function aggiornaCodiceMP(force){
  const mp=document.getElementById(\'mag-codice_mp\');
  if(!mp) return;
  // Auto-compila descrizione dalla categoria se vuota
  const catSel2=document.getElementById(\'mag-categoria\');
  const descEl=document.getElementById(\'mag-descrizione\');
  if(catSel2&&descEl&&!descEl.value&&catSel2.value){
    const opt2=catSel2.options[catSel2.selectedIndex];
    const descr2=opt2?opt2.getAttribute(\'data-descr\')||\'\':null;
    if(descr2) descEl.value=descr2;
  }
  if(mp.value&&!force) return; // non sovrascrivere se già compilato
  const catSel=document.getElementById(\'mag-categoria\');
  const cat=(catSel&&catSel.value)?catSel.value.toUpperCase().replace(\'_\',\'-\').slice(0,6):\'\';
  const l=document.getElementById(\'mag-larghezza_mm\')?.value||\'\';
  const h=document.getElementById(\'mag-altezza_mm\')?.value||\'\';
  const s=document.getElementById(\'mag-spessore_mm\')?.value||\'\';
  const fin=document.getElementById(\'mag-codice_finitura\')?.value||\'\';
  const parts=[cat,l,h,s,fin].filter(Boolean);
  if(parts.length>1) mp.value=parts.join(\'-\');
}

var _magEditId=null;

async function salvaMagazzino(){
  const d={
    codice_mp:document.getElementById(\'mag-codice_mp\')?.value?.trim()||null,
    descrizione:document.getElementById(\'mag-descrizione\')?.value?.trim()||null,
    categoria:document.getElementById(\'mag-categoria\')?.value?.trim()||null,
    codice_finitura:document.getElementById(\'mag-codice_finitura\')?.value?.trim()||null,
    nome_finitura:document.getElementById(\'mag-nome_finitura\')?.value?.trim()||null,
    altezza_mm:parseFloat(document.getElementById(\'mag-altezza_mm\')?.value)||null,
    larghezza_mm:parseFloat(document.getElementById(\'mag-larghezza_mm\')?.value)||null,
    spessore_mm:parseFloat(document.getElementById(\'mag-spessore_mm\')?.value)||null,
    pz_per_confezione:parseFloat(document.getElementById(\'mag-pz_per_confezione\')?.value)||1,
    unita_ordine:document.getElementById(\'mag-unita_ordine\')?.value||\'pz\',
    scorta_minima:parseFloat(document.getElementById(\'mag-scorta_minima\')?.value)||0,
    scorta_target:parseFloat(document.getElementById(\'mag-scorta_target\')?.value)||0,
    unita:document.getElementById(\'mag-unita\')?.value||\'pz\',
    ubicazione:document.getElementById(\'mag-ubicazione\')?.value?.trim()||null,
    updated_at:new Date().toISOString()
  };
  if(!d.descrizione){toast(\'Inserisci descrizione\',\'err\');return;}
  let er;
  if(_magEditId){const r=await sb.from(\'magazzino\').update(d).eq(\'id\',_magEditId);er=r.error;}
  else{const r=await sb.from(\'magazzino\').insert([d]);er=r.error;}
  if(er){toast(\'Errore: \'+er.message,\'err\');return;}
  toast(_magEditId?\'Aggiornato\':\'Aggiunto\',\'ok\');
  closeForm(\'modal-magazzino\');
  renderMagazzino();
}

async function duplicaArticoloMag(id){
  const {data:m}=await sb.from(\'magazzino\').select(\'*\').eq(\'id\',id).single();
  if(!m){toast(\'Articolo non trovato\',\'err\');return;}
  const nuovo={...m};
  delete nuovo.id;delete nuovo.created_at;delete nuovo.updated_at;
  nuovo.codice_mp=(m.codice_mp?m.codice_mp+\' (copia)\':null);
  nuovo.giacenza=0;
  const {error}=await sb.from(\'magazzino\').insert([nuovo]);
  if(error){toast(\'Errore: \'+error.message,\'err\');return;}
  toast(\'Articolo duplicato\',\'ok\');renderMagazzino();
}

async function eliminaArticoloMag(){
  if(!_magEditId||!confirm(\'Eliminare questo articolo e tutti i suoi movimenti?\'))return;
  const r=await sb.from(\'magazzino\').delete().eq(\'id\',_magEditId);
  if(r.error){toast(\'Errore: \'+r.error.message,\'err\');return;}
  toast(\'Eliminato\',\'ok\');closeForm(\'modal-magazzino\');renderMagazzino();
}

async function caricaFornitori(magId){
  const {data}=await sb.from(\'magazzino_fornitori\').select(\'*,anagrafiche(ragione_sociale)\').eq(\'magazzino_id\',magId);
  const el=document.getElementById(\'mag-fornitori-list\');
  if(!el) return;
  if(!data||!data.length){el.innerHTML=\'<div style="font-size:12px;color:var(--mid)">Nessun fornitore associato.</div>\';return;}
  el.innerHTML=data.map(function(f){
    return \'<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:0.5px solid var(--border);font-size:12px">\'+
      \'<span style="flex:1"><strong>\'+(f.anagrafiche?.ragione_sociale||\'?\')+\'</strong>\'+
      (f.codice_fornitore?\' <span style="color:var(--mid)">\'+f.codice_fornitore+\'</span>\':\'\')+
      (f.prezzo_acquisto?\' \xe2\x80\x94 \xe2\x82\xac\'+f.prezzo_acquisto:\'\')+
      (f.lead_time_giorni?\' \xe2\x80\x94 \'+f.lead_time_giorni+\'gg\':\'\')+
      (f.preferito?\' <span class="badge bg">preferito</span>\':\'\')+
      \'</span>\'+
      \'<button class="btn btn-sm" data-fid="\'+f.id+\'" onclick="eliminaFornitore(this.dataset.fid)">&times;</button></div>\';
  }).join(\'\');
}

async function apriAggiuntaFornitore(){
  const {data:fornitori}=await sb.from(\'anagrafiche\').select(\'id,ragione_sociale\').eq(\'tipo\',\'fornitore\').order(\'ragione_sociale\');
  const opts=(fornitori||[]).map(function(a){return \'<option value="\'+a.id+\'">\'+a.ragione_sociale+\'</option>\';}).join(\'\');
  const html=\'<div style="background:var(--beige);border-radius:var(--radius);padding:12px;margin-top:8px">\'+
    \'<div style="display:grid;grid-template-columns:2fr 1fr 1fr 80px;gap:8px;margin-bottom:8px">\'+
    \'<select id="forn-ana" style="padding:6px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px"><option value="">Seleziona fornitore...</option>\'+opts+\'</select>\'+
    \'<input id="forn-cod" type="text" placeholder="Cod. articolo forn." style="padding:6px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px">\'+
    \'<input id="forn-prez" type="number" placeholder="Prezzo acquisto" step="0.01" style="padding:6px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px">\'+
    \'<input id="forn-lead" type="number" placeholder="Lead time gg" style="padding:6px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px">\'+
    \'</div>\'+
    \'<div style="display:flex;gap:8px;align-items:center">\'+
    \'<label style="font-size:12px;display:flex;align-items:center;gap:4px"><input type="checkbox" id="forn-pref"> Fornitore preferito</label>\'+
    \'<button class="btn btn-sm btn-red" onclick="salvaFornitore()">Salva fornitore</button>\'+
    \'<button class="btn btn-sm" onclick="this.parentElement.parentElement.remove()">Annulla</button>\'+
    \'</div></div>\';
  const btn=document.querySelector(\'#mag-fornitori-section button\');
  if(btn) btn.insertAdjacentHTML(\'afterend\',html);
}

async function salvaFornitore(){
  const anaId=document.getElementById(\'forn-ana\')?.value;
  if(!anaId||!_magEditId){toast(\'Seleziona fornitore\',\'err\');return;}
  const d={magazzino_id:_magEditId,anagrafica_id:anaId,
    codice_fornitore:document.getElementById(\'forn-cod\')?.value?.trim()||null,
    prezzo_acquisto:parseFloat(document.getElementById(\'forn-prez\')?.value)||0,
    lead_time_giorni:parseInt(document.getElementById(\'forn-lead\')?.value)||0,
    preferito:document.getElementById(\'forn-pref\')?.checked||false};
  if(d.preferito) await sb.from(\'magazzino_fornitori\').update({preferito:false}).eq(\'magazzino_id\',_magEditId);
  const {error}=await sb.from(\'magazzino_fornitori\').insert([d]);
  if(error){toast(\'Errore: \'+error.message,\'err\');return;}
  toast(\'Fornitore aggiunto\',\'ok\');
  caricaFornitori(_magEditId);
}

async function eliminaFornitore(id){
  if(!confirm(\'Rimuovere questo fornitore?\'))return;
  await sb.from(\'magazzino_fornitori\').delete().eq(\'id\',id);
  caricaFornitori(_magEditId);
}

async function caricaMovimenti(magId){
  const {data}=await sb.from(\'magazzino_movimenti\').select(\'*\').eq(\'magazzino_id\',magId).order(\'created_at\',{ascending:false}).limit(10);
  const el=document.getElementById(\'mag-movimenti-list\');
  if(!el) return;
  if(!data||!data.length){el.innerHTML=\'<div style="color:var(--mid)">Nessun movimento.</div>\';return;}
  el.innerHTML=\'<table style="width:100%;font-size:12px"><thead><tr>\'+
    \'<th>Data</th><th>Tipo</th><th>Q.tà</th><th>Causale</th></tr></thead><tbody>\'+
    data.map(function(m){
      const col=m.tipo===\'carico\'?\'var(--green-tx)\':m.tipo===\'scarico\'?\'var(--red)\':\'var(--mid)\';
      return \'<tr><td>\'+(m.created_at||\'\').slice(0,10)+\'</td>\'+
        \'<td style="color:\'+col+\';font-weight:500">\'+m.tipo+\'</td>\'+
        \'<td>\'+(m.tipo===\'scarico\'?\'-\':\'+\')+\'\'+m.quantita+\'</td>\'+
        \'<td>\'+(m.causale||\'&#8212;\')+\'</td></tr>\';
    }).join(\'\')+\'</tbody></table>\';
}

async function registraMovimento(){
  if(!_magEditId){toast(\'Salva prima: articolo non salvato\',\'err\');return;}
  const tipo=document.getElementById(\'mov-tipo\')?.value;
  const qty=parseFloat(document.getElementById(\'mov-quantita\')?.value||0);
  const causale=document.getElementById(\'mov-causale\')?.value?.trim()||null;
  if(!qty||qty<=0){toast(\'Inserisci una quantità\',\'err\');return;}
  // Calcola nuova giacenza
  const {data:art}=await sb.from(\'magazzino\').select(\'giacenza,scorta_minima,scorta_target\').eq(\'id\',_magEditId).single();
  let giacenza=parseFloat(art?.giacenza||0);
  if(tipo===\'carico\') giacenza+=qty;
  else if(tipo===\'scarico\') giacenza=Math.max(0,giacenza-qty);
  else giacenza=qty; // rettifica
  // Salva movimento
  await sb.from(\'magazzino_movimenti\').insert([{magazzino_id:_magEditId,tipo,quantita:qty,causale}]);
  // Aggiorna giacenza
  await sb.from(\'magazzino\').update({giacenza,updated_at:new Date().toISOString()}).eq(\'id\',_magEditId);
  // Aggiorna UI
  const gEl=document.getElementById(\'mag-giacenza\');if(gEl)gEl.value=giacenza;
  document.getElementById(\'mov-quantita\').value=\'\';
  document.getElementById(\'mov-causale\').value=\'\';
  toast(\'Movimento registrato\',\'ok\');
  caricaMovimenti(_magEditId);
  renderMagazzino();
  // Controlla sottoscorta
  if(tipo===\'scarico\'&&giacenza<=parseFloat(art?.scorta_minima||0)){
    toast(\'Attenzione: articolo sotto scorta!\',\'err\');
  }
}


async function renderProduzione(){
  const {data} = await sb.from('ordini_produzione').select('*,ordini(numero)').order('created_at',{ascending:false});
  const rows=(data||[]).map(op=>\`
    <tr class="data-row">
      <td><strong>\${op.numero_op||'—'}</strong></td>
      <td>\${op.prodotto||'—'}</td>
      <td>\${op.quantita||'—'} pz</td>
      <td>\${op.fase||'—'}</td>
      <td>\${fmtData(op.data_inizio)}</td>
      <td>\${fmtData(op.data_fine)}</td>
      <td><div style="display:flex;align-items:center;gap:6px">\${pbar(op.avanzamento)}<span style="font-size:11px;color:var(--mid)">\${op.avanzamento||0}%</span></div></td>
      <td>\${badgeStato(op.stato||'pianificato')}</td>
    </tr>\`).join('');
  document.getElementById('main-content').innerHTML=\`
  <div class="card">
    <div class="card-header"><span class="card-title">Ordini di produzione</span></div>
    <table>
      <thead><tr><th>N° OP</th><th>Prodotto</th><th>Q.tà</th><th>Fase</th><th>Inizio</th><th>Fine prev.</th><th>Avanzamento</th><th>Stato</th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:24px;font-style:italic">Nessun ordine di produzione ancora</td></tr>'}</tbody>
    </table>
  </div>\`;
}

// ── DIPENDENTI ────────────────────────────────────────
async function renderDipendenti(){
  const {data} = await sb.from('dipendenti').select('*').order('cognome');
  const rows=(data||[]).map(d=>\`
    <tr class="data-row">
      <td><strong>\${d.cognome||''} \${d.nome||''}</strong></td>
      <td>\${d.ruolo||'—'}</td>
      <td>\${d.reparto||'—'}</td>
      <td>\${d.contratto||'—'}</td>
      <td>\${d.ore_settimanali||'—'} h</td>
      <td>\${badgeStato(d.stato||'presente')}</td>
    </tr>\`).join('');
  document.getElementById('main-content').innerHTML=\`
  <div class="grid-4" style="margin-bottom:16px">
    <div class="metric"><div class="metric-label">Totale dipendenti</div><div class="metric-value">\${(data||[]).length}</div></div>
    <div class="metric"><div class="metric-label">Presenti</div><div class="metric-value">\${(data||[]).filter(d=>d.stato==='presente').length}</div></div>
    <div class="metric"><div class="metric-label">Assenti</div><div class="metric-value" style="color:var(--red)">\${(data||[]).filter(d=>d.stato!=='presente').length}</div></div>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Registro dipendenti</span></div>
    <table>
      <thead><tr><th>Nome</th><th>Ruolo</th><th>Reparto</th><th>Contratto</th><th>Ore/sett.</th><th>Stato</th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="6" style="text-align:center;color:var(--mid);padding:24px;font-style:italic">Nessun dipendente ancora</td></tr>'}</tbody>
    </table>
  </div>\`;
}

// ── VALIDAZIONI ───────────────────────────────────────
function validatePIVA(){
  const el=document.getElementById('ana-piva');
  const val=el.value.replace(/\\s/g,'');
  const p=el.closest('.form-field');
  if(!val){p.classList.remove('invalid');return true;}
  const ok=/^\\d{11}$/.test(val);
  p.classList.toggle('invalid',!ok);
  document.getElementById('err-piva').style.display=ok?'none':'block';
  return ok;
}
function validateCF(){
  const el=document.getElementById('ana-cf');
  const val=el.value.replace(/\\s/g,'').toUpperCase();
  if(!val) return true;
  const ok=/^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$/.test(val)||/^\\d{11}$/.test(val);
  el.closest('.form-field').classList.toggle('invalid',!ok);
  document.getElementById('err-cf').style.display=ok?'none':'block';
  return ok;
}
function validateIBAN(){
  const el=document.getElementById('ana-iban');
  const val=el.value.replace(/\\s/g,'').toUpperCase();
  if(!val) return true;
  const ok=/^[A-Z]{2}\\d{2}[A-Z0-9]{11,30}$/.test(val);
  el.closest('.form-field').classList.toggle('invalid',!ok);
  document.getElementById('err-iban').style.display=ok?'none':'block';
  return ok;
}

// ── FORM UTILS ────────────────────────────────────────
function closeForm(id){
  document.getElementById(id).classList.remove('open');
}
// Form overlay — NON chiudere cliccando fuori, solo con i pulsanti espliciti
// document.querySelectorAll('.form-overlay').forEach(o=>{
//   o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');});
// });
// Chiudi solo anagrafica e ordine con click fuori (non configuratore e nuovo doc)
document.getElementById('form-anagrafica').addEventListener('click',e=>{if(e.target===document.getElementById('form-anagrafica'))closeForm('form-anagrafica');});
document.getElementById('form-ordine').addEventListener('click',e=>{if(e.target===document.getElementById('form-ordine'))closeForm('form-ordine');});

// ══════════════════════════════════════════════════════
// CONFIGURATORE — stato globale
// ══════════════════════════════════════════════════════
let CFG = {};          // configurazione corrente porta
let CFG_MODE = null;   // 'preventivo' | 'ordine'
let CFG_TARGET_ID = null; // id preventivo o ordine corrente
let CFG_RIGHE = [];    // righe accumulate prima del salvataggio testata
let CFG_EDIT_RIGA_ID = null;  // id riga in modifica (null = nuova riga)
let CFG_EDIT_RIGA_NUM = null; // riga_numero da preservare in modifica

function resetCFG(){
  CFG = {
    serie:null, modello:null, finitura:null, colore_speciale:null,
    finitura_telaio:null, nome_finitura_telaio:'', _finitura_telaio_come_porta:true, _colore_speciale_telaio:null,
    pannello_bugna:null, colore_alu:null, colore_pietra:null,
    tipo_vetro:null, apertura:null, senso:null,
    serratura:null, cilindro:null, pomolino:null,
    larghezza:null, altezza:null, misura_custom:false,
    spessore:null, spalla:null, accessorio_telaio:null,
    ferramenta:null, maniglia:null, colore_maniglia:null,
    quantita:1, note_riga:'',
    // prezzi componenti
    p_base:0, p_vetro:0, p_finitura:0, p_bugna:0,
    p_inserto:0, p_apertura:0, p_telaio:0, p_acc_telaio:0,
    p_ferramenta:0, p_maniglia:0, p_extra_incisioni:0,
    p_serratura:0, p_cilindro:0, p_pomolino:0,
    // nomi per descrizione
    nome_serie:'', nome_modello:'', nome_finitura:'',
    nome_apertura:'', nome_colore_alu:'', nome_colore_pietra:'',
    nome_tipo_vetro:'', nome_ferramenta:'', nome_maniglia:'',
    nome_serratura:'', nome_cilindro:'', nome_pomolino:'',
    nome_colore_maniglia:'',
    // flags
    _flags:{}, _richiede_cilindro:false, _richiede_pomolino:false, _maniglia_esclusa:false,
    _vetroIncluso:false, _haExtraIncisioni:false, _finitura_pct:0, _finitura_fisso:0,
    _isDoppiaAnta:false, _needsComFmSuppl:false,
    _isFuoriH:false, _isFuoriL:false, _p_fuori_h:0, _p_fuori_l:0,
    _fuori_h_pct:0, _fuori_l_pct:0, _p_varsavia:0,
    _p_misura:0, _pct_misura:0, _lCustom:false, _hCustom:false,
    // imballo
    posata_da_noi:false,
    _imballo_codice:null, _imballo_desc:'', _imballo_metodo:null,
    _imballo_capienza:null, _imballo_prezzo_unit:0, _imballo_totale:0,
    _imballo_serie:null, _imballo_serie_posa:null, _imballo_fragile:false,
    _imballo_modello:null, _supp_fragile:0,
    // esclusioni telaio / coprifili per la posizione
    escludi_telaio:false, escludi_coprifili:false,
    // coprifili (profilo per apertura; colore = finitura telaio; lunghezza allo scarico)
    coprifili_larghezza:null, coprifili_aste:5,
    coprifili_config:null,    // snapshot salvato sulla riga {larghezza,aste,colore_codice,colore_nome,supplemento}
    _coprifili_set:null, _coprifili_set_apertura:null,
    p_coprifili:0,
    nome_coprifili:''
  };
}
resetCFG();

// ── IMBALLO: risoluzione e calcolo del costo per la posizione ──────────
// Risoluzione: se "posata da noi" e la serie ha un imballo-posa → quello;
// altrimenti modello.codice_imballo → serie.codice_imballo → imballo_default.
// Metodo: per_pezzo = prezzo×qta · a_scatola = ceil(qta/capienza)×prezzo · a_posizione = prezzo.
// Supplemento fragile (se serie fragile) aggiunto una volta per pezzo se per_pezzo, altrimenti una volta.
async function calcolaImballo(){
  const qta = CFG.quantita || 1;
  // Scegli il codice imballo da applicare
  let cod = null;
  if(CFG.posata_da_noi && CFG._imballo_serie_posa) cod = CFG._imballo_serie_posa;
  else cod = CFG._imballo_modello || CFG._imballo_serie || null;
  if(!cod){
    // fallback: imballo_default dalle impostazioni
    const {data:def} = await sb.from('impostazioni').select('valore').eq('chiave','imballo_default').maybeSingle();
    cod = (def&&def.valore)||null;
  }
  if(!cod){ CFG._imballo_codice=null; CFG._imballo_desc=''; CFG._imballo_prezzo_unit=0; CFG._imballo_totale=0; return; }

  const {data:imb} = await sb.from('listino_imballi').select('*').eq('codice',cod).maybeSingle();
  if(!imb || imb.attivo===false){ CFG._imballo_codice=null; CFG._imballo_desc=''; CFG._imballo_prezzo_unit=0; CFG._imballo_totale=0; return; }

  const prezzo = parseFloat(imb.prezzo)||0;
  const metodo = imb.metodo||'per_pezzo';
  let base = 0, unit = prezzo;
  if(metodo==='a_scatola'){
    const cap = parseInt(imb.capienza)||1;
    const scatole = Math.ceil(qta / Math.max(1,cap));
    base = scatole * prezzo;
  } else if(metodo==='a_posizione'){
    base = prezzo;
  } else { // per_pezzo
    base = prezzo * qta;
  }
  // Supplemento fragile
  let supp = 0;
  if(CFG._imballo_fragile){
    const s = parseFloat(CFG._supp_fragile)||0;
    supp = (metodo==='per_pezzo') ? s*qta : s;
  }
  CFG._imballo_codice = imb.codice;
  CFG._imballo_desc = imb.descrizione||imb.codice;
  CFG._imballo_metodo = metodo;
  CFG._imballo_capienza = imb.capienza||null;
  CFG._imballo_prezzo_unit = prezzo;
  CFG._imballo_totale = Math.round((base+supp)*100)/100;
}

function cfgTotale(){
  // Prezzo finitura (fisso o percentuale)
  let p_fin = CFG.p_finitura||0;
  if((CFG._finitura_pct||0) > 0 && (CFG.p_base||0) > 0){
    p_fin = Math.round(CFG.p_base * CFG._finitura_pct / 100 * 100)/100;
  }

  // Prezzo spalla (telaio)
  const p_telaio = CFG.p_telaio||0;

  // Subtotale base (su cui si applicano i fuori misura)
  const sub = (CFG.p_base||0) + p_fin + (CFG.p_apertura||0) + p_telaio;

  // Supplemento doppia anta: (base+finitura+telaio)*2 + eventuale extra CS2A
  let p_doppia=0;
  if(CFG._isDoppiaAnta){
    p_doppia = (CFG.p_base||0) + p_fin + p_telaio; // già moltiplicato x2 = raddoppio del sub
    if(CFG.apertura==='CS2A') p_doppia += 124;
  }

  // Sovrapprezzo misura specifica (fisso o % sul sub)
  let p_misura = CFG._p_misura||0;
  if((CFG._pct_misura||0)>0) p_misura = Math.round(sub*(CFG._pct_misura/100)*100)/100;

  // Supplemento fuori misura H (+20% su sub, oppure fisso €45)
  let p_fh=0;
  if(CFG._isFuoriH){
    if(CFG._fuori_h_pct) p_fh=Math.round(sub*(CFG._fuori_h_pct/100)*100)/100;
    else p_fh=CFG._p_fuori_h||0;
  }

  // Supplemento fuori misura L (+40% su sub+fh)
  let p_fl=0;
  if(CFG._isFuoriL){
    p_fl=Math.round((sub+p_fh)*(CFG._fuori_l_pct/100)*100)/100;
  }

  // Totale porta
  const tot_porta = CFG._isDoppiaAnta ? sub + p_doppia : sub;

  return Math.round((
    tot_porta + p_misura + p_fh + p_fl +
    (CFG.p_vetro||0)+(CFG.p_bugna||0)+(CFG.p_inserto||0)+
    (CFG.p_acc_telaio||0)+
    (CFG.p_ferramenta||0)+(CFG.p_maniglia||0)+(CFG.p_extra_incisioni||0)+
    (CFG.p_serratura||0)+(CFG.p_cilindro||0)+(CFG.p_pomolino||0)+
    (CFG._p_varsavia||0)+(CFG.p_coprifili||0)
  )*100)/100;
}

function listino(){ return window._prevListino || 'A'; }

function cfgUpdatePrice(){
  const tot = cfgTotale();
  const el = document.getElementById('cfg-prezzo-unitario');
  if(el) el.textContent = '€ '+tot.toLocaleString('it-IT',{minimumFractionDigits:2,maximumFractionDigits:2});
  const qty = parseFloat(document.getElementById('cfg-qty')?.value||1)||1;
  const elTot = document.getElementById('cfg-prezzo-totale');
  if(elTot) elTot.textContent = '€ '+(tot*qty).toLocaleString('it-IT',{minimumFractionDigits:2,maximumFractionDigits:2});
}

// ── MODAL CONFIGURATORE ───────────────────────────────
function openConfiguratore(mode, targetId, listino_in){
  CFG_MODE = mode;
  CFG_TARGET_ID = targetId;
  CFG_EDIT_RIGA_ID = null;   // nuova riga
  CFG_EDIT_RIGA_NUM = null;
  window._prevListino = listino_in || 'A';
  resetCFG();
  renderCfgStep('serie');
  const el = ensureModalInBody('modal-cfg');
  el.classList.add('open');
}

// Riapre il configuratore su una riga esistente, con tutte le scelte preselezionate.
// L'utente naviga con "Avanti" (ricalcolando prezzi/flag correttamente) e alla fine
// la riga viene AGGIORNATA invece di crearne una nuova.
async function modificaRiga(tabella, rigaId, docId, mode, listino_in){
  const {data:r, error} = await sb.from(tabella).select('*').eq('id',rigaId).maybeSingle();
  if(error || !r){ toast('Riga non trovata','err'); return; }
  CFG_MODE = mode;
  CFG_TARGET_ID = docId;
  CFG_EDIT_RIGA_ID = rigaId;
  CFG_EDIT_RIGA_NUM = r.riga_numero||null;
  window._prevListino = (listino_in||'A');
  resetCFG();
  // Precarica lo stato dal record salvato (i codici e i nomi; i flag/prezzi
  // si ricalcolano navigando gli step, quindi non li forziamo a mano)
  CFG.serie=r.codice_serie; CFG.nome_serie=r.nome_serie||'';
  CFG.modello=r.codice_modello; CFG.nome_modello=r.nome_modello||'';
  CFG.finitura=r.codice_finitura; CFG.nome_finitura=r.nome_finitura||'';
  CFG.finitura_telaio=r.codice_finitura_telaio||r.codice_finitura;
  CFG.nome_finitura_telaio=r.nome_finitura_telaio||r.nome_finitura||'';
  CFG._finitura_telaio_come_porta = (CFG.finitura_telaio===CFG.finitura);
  if(CFG.finitura_telaio==='SPECIALE' && !CFG._finitura_telaio_come_porta) CFG._colore_speciale_telaio=CFG.nome_finitura_telaio.replace(/^Colore speciale\\s*/i,'');
  CFG.pannello_bugna=r.pannello_bugna||null;
  CFG.colore_alu=r.codice_colore_alu||null; CFG.nome_colore_alu=r.nome_colore_alu||'';
  CFG.colore_pietra=r.codice_colore_pietra||null; CFG.nome_colore_pietra=r.nome_colore_pietra||'';
  CFG.tipo_vetro=r.codice_tipo_vetro||null; CFG.nome_tipo_vetro=r.nome_tipo_vetro||'';
  CFG.apertura=r.codice_apertura||null; CFG.nome_apertura=r.nome_apertura||'';
  CFG.senso=r.senso_apertura||null;
  CFG.larghezza=r.larghezza_mm||null; CFG.altezza=r.altezza_mm||null;
  CFG.misura_custom=!!r.misura_custom;
  CFG.spessore=r.spessore_muro_cm||null;
  CFG.spalla=r.codice_spalla||null; CFG.accessorio_telaio=r.tipo_accessorio_telaio||null;
  CFG.ferramenta=r.codice_ferramenta||null; CFG.nome_ferramenta=r.nome_ferramenta||'';
  CFG.maniglia=r.codice_maniglia||null; CFG.nome_maniglia=r.nome_maniglia||'';
  CFG.colore_maniglia=r.codice_colore_maniglia||null; CFG.nome_colore_maniglia=r.nome_colore_maniglia||'';
  CFG.quantita=r.quantita||1; CFG.note_riga=r.note_riga||''; CFG.stanza=r.stanza||'';
  CFG.posata_da_noi=!!r.posata_da_noi;
  CFG.escludi_telaio=!!r.escludi_telaio;
  CFG.escludi_coprifili=!!r.escludi_coprifili;
  const _cc = (r.coprifili_config && typeof r.coprifili_config==='object' && !Array.isArray(r.coprifili_config)) ? r.coprifili_config : null;
  CFG.coprifili_larghezza = _cc && _cc.larghezza!=null ? _cc.larghezza : null;
  CFG.coprifili_aste = _cc && _cc.aste!=null ? parseFloat(_cc.aste) : 5;
  CFG.p_coprifili = parseFloat(r.prezzo_coprifili)||0;
  CFG._coprifili_set = undefined; CFG._coprifili_set_apertura = null; // forza ricarica set in cfgCoprifili
  // Precarica i prezzi salvati, così scorrendo con "Avanti" (senza ri-selezionare)
  // il totale resta corretto; se l'utente cambia uno step, quel prezzo si ricalcola.
  CFG.p_base=r.prezzo_base||0; CFG.p_vetro=r.prezzo_vetro||0; CFG.p_finitura=r.prezzo_finitura||0;
  CFG.p_bugna=r.prezzo_bugna||0; CFG.p_inserto=r.prezzo_inserto||0; CFG.p_apertura=r.prezzo_apertura||0;
  CFG.p_telaio=r.prezzo_telaio||0; CFG.p_acc_telaio=r.prezzo_accessorio_telaio||0;
  CFG.p_ferramenta=r.prezzo_ferramenta||0; CFG.p_maniglia=r.prezzo_maniglia||0;
  CFG.p_extra_incisioni=r.prezzo_extra_incisioni||0;
  // Carica i flag del modello e i dati imballo (necessari per la sequenza e il ricalcolo)
  if(r.codice_modello){
    const {data:m} = await sb.from('modelli').select('*').eq('codice',r.codice_modello).maybeSingle();
    if(m){
      CFG._flags=m;
      CFG._qtaMin=m.qta_minima||1; CFG._qtaStep=m.step_quantita||1;
      CFG._imballo_modello=m.codice_imballo||null;
    }
  }
  CFG._isAccessorio = CFG.serie==='ACC';
  CFG._isPannelloBlindato = CFG.serie==='PAN-BL';
  const ACC_TIPO2 = {'PAS':'passata','SOP':'sopraluce','COP':'coprifilo','COP3M':'coprifilo','COP65':'coprifilo','COP90':'coprifilo','COP3M65':'coprifilo','COP3M90':'coprifilo','FPAN':'semplice','IMB':'semplice','RIN':'semplice','BSC':'semplice','AL100':'semplice','AL230':'semplice','ZOC':'semplice'};
  CFG._tipoAccessorio = ACC_TIPO2[r.codice_modello] || (CFG._isPannelloBlindato?'pannello':null);
  if(CFG.serie){
    const {data:srow} = await sb.from('serie').select('codice_imballo,codice_imballo_posa,imballo_fragile').eq('codice',CFG.serie).maybeSingle();
    if(srow){ CFG._imballo_serie=srow.codice_imballo||null; CFG._imballo_serie_posa=srow.codice_imballo_posa||null; CFG._imballo_fragile=!!srow.imballo_fragile; }
    const {data:sf} = await sb.from('impostazioni').select('valore').eq('chiave','supplemento_imballo_fragile').maybeSingle();
    CFG._supp_fragile = parseFloat(sf&&sf.valore)||0;
  }
  renderCfgStep('serie');
  const el = ensureModalInBody('modal-cfg');
  el.classList.add('open');
  toast('Modifica riga: naviga con Avanti e cambia ciò che serve','ok');
}

function closeCfg(){
  document.getElementById('modal-cfg').classList.remove('open');
}

let _cfgStepCorrente = 'serie';  // step attualmente mostrato (per il pulsante "Avanti")
// Step che hanno già un pulsante "Avanti" proprio dentro la scheda: lì la barra
// non deve mostrare un secondo Avanti (evita il doppione).
const _STEP_CON_AVANTI_PROPRIO = ['finitura_telaio','opzioni','misure','spessore','coprifili','ferramenta','acc_misure','acc_sopraluce','acc_spessore','acc_pannello','acc_qta'];
function updateCfgNav(step){
  const nav = document.getElementById('cfg-nav');
  if(!nav) return;
  // La barra (solo "Avanti") serve nella modifica per scorrere gli step che NON hanno
  // un pulsante Avanti proprio nella scheda. Altrove è nascosta per non duplicarlo.
  const mostra = !!CFG_EDIT_RIGA_ID && step!=='riepilogo' && !_STEP_CON_AVANTI_PROPRIO.includes(step);
  nav.style.display = mostra ? 'flex' : 'none';
}
async function renderCfgStep(step){
  _cfgStepCorrente = step;
  const body = document.getElementById('cfg-body');
  body.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  updateCfgStepper(step);
  updateCfgNav(step);

  if(step==='serie') await cfgSerie();
  else if(step==='modello') await cfgModello();
  else if(step==='finitura') await cfgFinitura();
  else if(step==='finitura_telaio') await cfgFinituraTelaio();
  else if(step==='colore_speciale') await cfgColoreSpeciale();
  else if(step==='opzioni') await cfgOpzioni();
  else if(step==='apertura') await cfgApertura();
  else if(step==='serratura') await cfgSerratura();
  else if(step==='cilindro') await cfgCilindro();
  else if(step==='misure') await cfgMisure();
  else if(step==='spessore') await cfgSpessore();
  else if(step==='coprifili') await cfgCoprifili();
  else if(step==='ferramenta') await cfgFerramenta();
  else if(step==='maniglia') await cfgManiglia();
  else if(step==='colore_maniglia') await cfgColoreManiglia();
  else if(step==='pomolino') await cfgPomolino();
  else if(step==='acc_misure') await cfgAccMisure();
  else if(step==='acc_sopraluce') await cfgAccSopraluce();
  else if(step==='acc_spessore') await cfgAccSpessore();
  else if(step==='acc_qta') await cfgAccQta();
  else if(step==='acc_pannello') await cfgAccPannello();
  else if(step==='riepilogo') await cfgRiepilogo();
}

// Sigle province italiane (per i dropdown provincia)
const PROVINCE_IT = ['AG','AL','AN','AO','AP','AQ','AR','AT','AV','BA','BG','BI','BL','BN','BO','BR','BS','BT','BZ','CA','CB','CE','CH','CL','CN','CO','CR','CS','CT','CZ','EN','FC','FE','FG','FI','FM','FR','GE','GO','GR','IM','IS','KR','LC','LE','LI','LO','LT','LU','MB','MC','ME','MI','MN','MO','MS','MT','NA','NO','NU','OR','PA','PC','PD','PE','PG','PI','PN','PO','PR','PT','PU','PV','PZ','RA','RC','RE','RG','RI','RM','RN','RO','SA','SI','SO','SP','SR','SS','SU','SV','TA','TE','TN','TO','TP','TR','TS','TV','UD','VA','VB','VC','VE','VI','VR','VT','VV'];
function provinceOptions(sel){
  return '<option value="">—</option>'+PROVINCE_IT.map(p=>\`<option value="\${p}" \${p===(sel||'').toUpperCase()?'selected':''}>\${p}</option>\`).join('');
}
// Popola il select provincia destinazione e seleziona la sigla data
function setProvinciaDest(sigla){
  const el=document.getElementById('ndoc-prv');
  if(el) el.innerHTML=provinceOptions(sigla||'');
}
// Ricompila i campi destinazione dall'anagrafica del cliente selezionato
function usaIndirizzoCliente(){
  const sel=document.getElementById('ndoc-clienti');
  const opt=sel&&sel.options[sel.selectedIndex];
  if(!opt||!opt.value){ toast('Seleziona prima un cliente','err'); return; }
  document.getElementById('ndoc-ind').value=opt.dataset.ind||'';
  document.getElementById('ndoc-cap').value=opt.dataset.cap||'';
  document.getElementById('ndoc-cit').value=opt.dataset.cit||'';
  setProvinciaDest(opt.dataset.prv||'');
  toast('Indirizzo cliente inserito','ok');
}

const CFG_STEPS = ['serie','modello','finitura','finitura_telaio','opzioni','apertura','serratura','misure','spessore','coprifili','ferramenta','maniglia','riepilogo'];
const CFG_LABELS = {serie:'Serie',modello:'Modello',finitura:'Finitura',finitura_telaio:'Colore telaio',opzioni:'Opzioni',apertura:'Apertura',misure:'Misure',spessore:'Spessore muro',coprifili:'Coprifili',ferramenta:'Ferramenta',riepilogo:'Riepilogo'};

// Step accessori
const CFG_ACC_STEPS = {
  passata:    ['serie','modello','finitura','acc_misure','acc_spessore','riepilogo'],
  sopraluce:  ['serie','modello','finitura','acc_sopraluce','acc_spessore','riepilogo'],
  semplice:   ['serie','modello','finitura','riepilogo'],
  coprifilo:  ['serie','modello','finitura','riepilogo'],
  pannello:   ['serie','modello','finitura','acc_pannello','riepilogo'],
};
const CFG_ACC_LABELS = {
  acc_misure:'Misure', acc_sopraluce:'Misure', acc_qta:'Quantità',
  acc_pannello:'Configurazione', acc_spessore:'Spessore muro'
};

// Sequenza effettiva degli step in base ai flag correnti (per il pulsante "Avanti →").
// Include gli step condizionali (cilindro, pomolino, colore_maniglia) non presenti in CFG_STEPS.
function cfgSequenzaEffettiva(){
  const f = CFG._flags||{};
  // Accessori / pannelli: usa la sequenza dedicata
  const tipo = CFG._tipoAccessorio || (CFG._isPannelloBlindato ? 'pannello' : null);
  if(tipo && CFG_ACC_STEPS[tipo]) return CFG_ACC_STEPS[tipo].slice();
  // Porte: costruisci la sequenza secondo i flag
  const haOpzioni = f.ha_vetro||f.ha_pannello_o_bugna||f.ha_inserto_alluminio||f.ha_inserto_pietra||f.ha_pantografatura;
  const seq = ['serie','modello','finitura','finitura_telaio'];
  if(haOpzioni) seq.push('opzioni');
  seq.push('apertura','serratura');
  if(CFG._richiede_cilindro) seq.push('cilindro');
  seq.push('misure','spessore','coprifili','ferramenta');
  if(!CFG._maniglia_esclusa) seq.push('maniglia','colore_maniglia');
  if(CFG._richiede_pomolino) seq.push('pomolino');
  seq.push('riepilogo');
  return seq;
}

// Va allo step successivo senza modificare/azzerare nulla (usato in modifica riga)
async function cfgAvanti(){
  const seq = cfgSequenzaEffettiva();
  let idx = seq.indexOf(_cfgStepCorrente);
  if(idx<0) idx = 0;
  const next = seq[Math.min(idx+1, seq.length-1)];
  await renderCfgStep(next);
}
async function cfgIndietro(){
  const seq = cfgSequenzaEffettiva();
  let idx = seq.indexOf(_cfgStepCorrente);
  if(idx<0) idx = 0;
  const prev = seq[Math.max(idx-1, 0)];
  await renderCfgStep(prev);
}

function updateCfgStepper(current){
  const el = document.getElementById('cfg-stepper');
  if(!el) return;

  // Usa stepper semplificato per accessori e pannelli
  const tipo = CFG._tipoAccessorio || (CFG._isPannelloBlindato ? 'pannello' : null);
  const steps = tipo ? (CFG_ACC_STEPS[tipo]||CFG_STEPS) : CFG_STEPS;
  const labels = tipo ? {...CFG_LABELS,...CFG_ACC_LABELS} : CFG_LABELS;

  const idx = steps.indexOf(current);
  el.innerHTML = steps.map((s,i)=>\`
    <div style="display:flex;align-items:center;gap:4px;font-size:11px;
      color:\${i<idx?'var(--green-tx)':i===idx?'var(--red)':'var(--mid)'}">
      <div style="width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;flex-shrink:0;
        background:\${i<idx?'var(--green-bg)':i===idx?'var(--red)':'var(--border)'};
        color:\${i<idx?'var(--green-tx)':i===idx?'#fff':'var(--mid)'}">
        \${i<idx?'✓':i+1}</div>
      <span style="display:\${i===idx?'inline':'none'}">\${labels[s]||s}</span>
    </div>
    \${i<steps.length-1?'<div style="width:16px;height:1px;background:var(--border);flex-shrink:0"></div>':''}\`
  ).join('');
}

async function cfgSerie(){
  const {data} = await sb.from('serie').select('*').order('nome');
  // Popola la cache delle serie laccate dai dati appena letti
  window._serieLaccate = new Set((data||[]).filter(s=>s.e_laccata).map(s=>s.codice));
  const cards = (data||[]).map(s=>\`
    <div onclick="selSerie('\${s.codice}','\${s.nome}')"
      style="border:\${CFG.serie===s.codice?'2px solid var(--red)':'0.5px solid var(--border)'};
        border-radius:var(--radius-lg);padding:14px 16px;cursor:pointer;
        background:\${CFG.serie===s.codice?'var(--red-bg)':'var(--white)'};
        transition:all 0.1s">
      <div style="font-size:14px;font-weight:500;color:\${CFG.serie===s.codice?'var(--red)':'var(--dark)'}">\${s.nome}</div>
      <div style="font-size:12px;color:var(--mid);margin-top:3px">\${s.descrizione||''}</div>
    </div>\`).join('');
  document.getElementById('cfg-body').innerHTML=\`
    <div style="font-size:13px;font-weight:500;margin-bottom:12px;color:var(--dark)">Seleziona la serie</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">\${cards}</div>\`;
}

async function selSerie(cod, nome){
  const cambia = CFG.serie !== cod;
  CFG.serie=cod; CFG.nome_serie=nome;
  if(cambia){ CFG.modello=null; CFG.finitura=null; }  // azzera a valle solo se cambia davvero
  await renderCfgStep('modello');
}

async function cfgModello(){
  const {data} = await sb.from('modelli')
    .select('*,prezzi_modello(listino,prezzo_base,prezzo_vetro,vetro_incluso,ha_extra_incisioni)')
    .eq('codice_serie',CFG.serie).eq('attivo',true).order('nome');
  const cards=(data||[]).map(m=>{
    const pm = m.prezzi_modello?.find(p=>p.listino===listino());
    const prezzo = pm?.prezzo_base||0;
    return \`<div onclick="selModello('\${m.codice}','\${m.nome.replace(/'/g,"\\\\'")}',\${prezzo},\${!!pm?.vetro_incluso},\${!!pm?.ha_extra_incisioni})"
      style="border:\${CFG.modello===m.codice?'2px solid var(--red)':'0.5px solid var(--border)'};
        border-radius:var(--radius);padding:10px 12px;cursor:pointer;
        background:\${CFG.modello===m.codice?'var(--red-bg)':'var(--white)'}">
      <div style="font-size:13px;font-weight:500;color:\${CFG.modello===m.codice?'var(--red)':'var(--dark)'}">\${m.nome}</div>
      <div style="font-size:10px;color:var(--mid);margin-top:2px">\${m.codice}</div>
      <div style="font-size:12px;color:var(--red);font-weight:500;margin-top:4px">€ \${prezzo.toLocaleString('it-IT',{minimumFractionDigits:2})}</div>
    </div>\`;
  }).join('');
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Seleziona il modello <span style="color:var(--mid);font-weight:400">— Serie \${CFG.nome_serie}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('serie')">← Cambia serie</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-height:calc(60vh);overflow-y:auto">\${cards}</div>\`;
}

async function selModello(cod, nome, prezzo, vetroIncluso, haExtraIncisioni){
  CFG.modello=cod; CFG.nome_modello=nome; CFG.p_base=prezzo;
  CFG._vetroIncluso=vetroIncluso; CFG._haExtraIncisioni=haExtraIncisioni;
  // Carica dati modello per flags
  const {data:m} = await sb.from('modelli').select('*').eq('codice',cod).single();
  CFG._flags = m;

  // Rileva se è un accessorio o pannello blindato
  CFG._isAccessorio = CFG.serie === 'ACC';
  CFG._isPannelloBlindato = CFG.serie === 'PAN-BL';

  // Tipo accessorio in base al codice modello
  const ACC_TIPO = {
    'PAS':'passata','SOP':'sopraluce',
    'COP':'coprifilo','COP3M':'coprifilo',
    'COP65':'coprifilo','COP90':'coprifilo','COP3M65':'coprifilo','COP3M90':'coprifilo',
    'FPAN':'semplice','IMB':'semplice','RIN':'semplice',
    'BSC':'semplice','AL100':'semplice','AL230':'semplice','ZOC':'semplice'
  };
  CFG._tipoAccessorio = ACC_TIPO[cod] || (CFG._isPannelloBlindato ? 'pannello' : null);

  // Quantità minima e step dal modello (gestiti dal pannello admin)
  CFG._qtaMin = (m && m.qta_minima) || 1;
  CFG._qtaStep = (m && m.step_quantita) || 1;

  // Dati imballo: dal modello (override) e dalla serie (default + posa + fragile)
  CFG._imballo_modello = (m && m.codice_imballo) || null;
  const {data:srow} = await sb.from('serie').select('codice_imballo,codice_imballo_posa,imballo_fragile').eq('codice',CFG.serie).maybeSingle();
  CFG._imballo_serie = (srow && srow.codice_imballo) || null;
  CFG._imballo_serie_posa = (srow && srow.codice_imballo_posa) || null;
  CFG._imballo_fragile = !!(srow && srow.imballo_fragile);
  const {data:sf} = await sb.from('impostazioni').select('valore').eq('chiave','supplemento_imballo_fragile').maybeSingle();
  CFG._supp_fragile = parseFloat(sf&&sf.valore)||0;

  await renderCfgStep('finitura');
}

// ── SISTEMA UNIVERSALE COMPATIBILITÀ ─────────────────
// Carica tutte le esclusioni per le scelte correnti del configuratore
// Logica CUMULATIVA: un'opzione viene esclusa se ALMENO UNA delle scelte precedenti la esclude
let _compatCache = null; // cache per evitare query ripetute nello stesso step

async function caricaEsclusioni(){
  const scelte = [];
  if(CFG.serie)         scelte.push({tipo:'serie',         codice:CFG.serie});
  if(CFG.modello)       scelte.push({tipo:'modello',       codice:CFG.modello});
  if(CFG.finitura)      scelte.push({tipo:'finitura',      codice:CFG.finitura});
  if(CFG.apertura)      scelte.push({tipo:'apertura',      codice:CFG.apertura});
  if(CFG.ferramenta)    scelte.push({tipo:'ferramenta',    codice:CFG.ferramenta});
  if(CFG.colore_alu)    scelte.push({tipo:'inserto_alu',   codice:CFG.colore_alu});
  if(CFG.colore_pietra) scelte.push({tipo:'inserto_pietra',codice:CFG.colore_pietra});
  if(CFG.tipo_vetro)    scelte.push({tipo:'vetro',         codice:CFG.tipo_vetro});
  if(scelte.length===0) return new Set();

  // Query separata per ogni scelta attiva — unico modo sicuro per filtrare su entrambe le colonne
  const promises = scelte.map(s =>
    sb.from('regole_compatibilita')
      .select('entita_b_tipo,entita_b_codice')
      .eq('entita_a_tipo', s.tipo)
      .eq('entita_a_codice', s.codice)
  );
  const risultati = await Promise.all(promises);

  const esclusi = new Set();
  risultati.forEach(({data}) => {
    (data||[]).forEach(r => esclusi.add(r.entita_b_tipo+':'+r.entita_b_codice));
  });
  return esclusi;
}
async function filtraPerCompatibilita(opzioni, categoria, codiceChiave){
  const esclusi = await caricaEsclusioni();
  if(esclusi.size===0) return opzioni;
  return opzioni.filter(op=>!esclusi.has(categoria+':'+op[codiceChiave]));
}

async function cfgFinitura(){
  var finQuery = sb.from('finiture').select('*')
    .eq('codice_serie',CFG.serie)
    .or(\`codice_modello.is.null,codice_modello.eq.\${CFG.modello}\`)
    .eq('attiva',true);
  // Filtra per fascia se pannello blindato
  if(CFG.serie==='PAN-BL'){
    if(CFG.modello==='PAN_LAM'||CFG.modello==='PAN-LAM') finQuery=finQuery.eq('fascia','LAMINATO');
    else if(CFG.modello==='PAN_LAC'||CFG.modello==='PAN-LAC') finQuery=finQuery.in('fascia',['MP CLASSIC','MP LIGHT','MP PREMIUM']);
  }
  const {data:tutteFiniture} = await finQuery.order('fascia').order('nome_finitura');

  const tutteNoSpec = (tutteFiniture||[]).filter(f=>f.codice_finitura!=='SPECIALE');
  const hasSpeciale = (tutteFiniture||[]).some(f=>f.codice_finitura==='SPECIALE');
  const data = await filtraPerCompatibilita(tutteNoSpec, 'finitura', 'codice_finitura');

  function calcSovr(f){
    const pct = f[\`sovrapprezzo_pct_\${listino().toLowerCase()}\`]||0;
    const fisso = f[\`sovrapprezzo_\${listino().toLowerCase()}\`]||0;
    if(pct > 0) return {tipo:'pct', val:pct};
    return {tipo:'fisso', val:fisso};
  }

  // Raggruppa per fascia
  const fasce = [];
  const fasciaMap = {};
  data.forEach(f=>{
    const fascia = f.fascia||'';
    if(!fasciaMap[fascia]){ fasciaMap[fascia]=[]; fasce.push(fascia); }
    fasciaMap[fascia].push(f);
  });

  const fasciaStyle = {
    'LAMINATO':   {bg:'#EDE7DE',tx:'var(--dark)',icon:'🟤'},
    'MP CLASSIC': {bg:'#E6DFD3',tx:'var(--dark)',icon:'⚪'},
    'MP LIGHT':   {bg:'#E8F4FD',tx:'#1A5276',icon:'🔵'},
    'MP PREMIUM': {bg:'#FDF3E7',tx:'#784212',icon:'🟡'},
    '': {bg:'transparent',tx:'var(--mid)',icon:''},
  };
  // Ordine fisso delle fasce: laminati sopra, poi laccati per intensità
  const _ordFasce = ['LAMINATO','MP CLASSIC','MP LIGHT','MP PREMIUM'];
  fasce.sort((a,b)=>{
    const ia=_ordFasce.indexOf(a), ib=_ordFasce.indexOf(b);
    return (ia<0?99:ia)-(ib<0?99:ib);
  });

  let html = '';
  fasce.forEach(fascia=>{
    const st = fasciaStyle[fascia]||fasciaStyle[''];
    if(fascia) html += \`<div style="grid-column:1/-1;padding:6px 10px;border-radius:var(--radius);background:\${st.bg};color:\${st.tx};font-size:11px;font-weight:600;letter-spacing:0.5px;margin-top:4px">\${st.icon} \${fascia}</div>\`;
    fasciaMap[fascia].forEach(f=>{
      const {tipo, val} = calcSovr(f);
      const sel = CFG.finitura===f.codice_finitura && !CFG.colore_speciale;
      const prezzLabel = val===0?'Inclusa':tipo==='pct'?\`+\${val}% sul prezzo base\`:\`+€\${val}\`;
      html += \`<div onclick="selFinitura('\${f.codice_finitura}','\${f.nome_finitura.replace(/'/g,"\\'")}',\${val},'\${tipo}',\${!!f.consente_bugna})"
        style="border:\${sel?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px 12px;cursor:pointer;background:\${sel?'var(--red-bg)':'var(--white)'}">
        <div style="font-size:13px;font-weight:500;color:\${sel?'var(--red)':'var(--dark)'}">\${f.nome_finitura}</div>
        <div style="font-size:11px;color:var(--mid);margin-top:2px">\${prezzLabel}</div>
      </div>\`;
    });
  });

  const specCard = hasSpeciale ? \`
    <div onclick="renderCfgStep('colore_speciale')"
      style="border:\${CFG.colore_speciale?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px 12px;cursor:pointer;background:\${CFG.colore_speciale?'var(--red-bg)':'var(--white)'};grid-column:1/-1;display:flex;align-items:center;gap:12px">
      <div style="width:36px;height:36px;border-radius:6px;background:linear-gradient(135deg,#e8d5f5,#d5e8f5,#f5e8d5);border:0.5px solid var(--border);flex-shrink:0"></div>
      <div>
        <div style="font-size:13px;font-weight:500;color:\${CFG.colore_speciale?'var(--red)':'var(--dark)'}">
          Colore speciale \${CFG.colore_speciale?\`<span style="font-weight:400">— \${CFG.colore_speciale}</span>\`:''}
        </div>
        <div style="font-size:11px;color:var(--mid);margin-top:2px">RAL · NCS · PANTONE — inserisci il codice colore personalizzato</div>
      </div>
    </div>\` : '';

  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Seleziona la finitura <span style="color:var(--mid);font-weight:400">— \${CFG.nome_modello}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('modello')">← Cambia modello</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-height:calc(60vh);overflow-y:auto">
      \${html}\${specCard}
    </div>\`;
}

async function selFinitura(cod, nome, sovrVal, sovrTipo, consenteBugna){
  CFG._finitura_pct = sovrTipo==='pct' ? sovrVal : 0;
  CFG._finitura_fisso = sovrTipo==='fisso' ? sovrVal : 0;
  CFG.p_finitura = sovrTipo==='pct' ? 0 : (sovrVal||0);
  CFG.finitura=cod; CFG.nome_finitura=nome;
  CFG._consenteBugna=consenteBugna;
  CFG.colore_speciale=null;
  // Se il telaio segue la porta, allinea la finitura telaio alla nuova scelta
  if(CFG._finitura_telaio_come_porta){
    CFG.finitura_telaio=cod; CFG.nome_finitura_telaio=nome;
  }
  cfgUpdatePrice();

  // Flusso accessori
  if(CFG._isAccessorio){
    const t = CFG._tipoAccessorio;
    if(t==='passata') return await renderCfgStep('acc_misure');
    if(t==='sopraluce') return await renderCfgStep('acc_sopraluce');
    if(t==='semplice'||t==='coprifilo') return await renderCfgStep('riepilogo');
  }
  if(CFG._isPannelloBlindato) return await renderCfgStep('acc_pannello');

  // Flusso porte normale → passa dalla scelta colore telaio/coprifili
  await renderCfgStep('finitura_telaio');
}

async function cfgColoreSpeciale(){
  const {data:specFin} = await sb.from('finiture')
    .select('sovrapprezzo_a,sovrapprezzo_p,sovrapprezzo_pct_a,sovrapprezzo_pct_p')
    .eq('codice_serie',CFG.serie).eq('codice_finitura','SPECIALE').limit(1);
  const sf = specFin?.[0];
  const lst = listino().toLowerCase();
  const sovr_fisso = sf?.[\`sovrapprezzo_\${lst}\`]||0;
  const sovr_pct = sf?.[\`sovrapprezzo_pct_\${lst}\`]||0;
  const sovrTipo = sovr_pct > 0 ? 'pct' : 'fisso';
  const sovrVal = sovr_pct > 0 ? sovr_pct : sovr_fisso;
  const sovrLabel = sovrVal===0?'Incluso nel prezzo base'
    : sovrTipo==='pct'?\`<strong>Sovrapprezzo: +\${sovrVal}% sul prezzo base</strong>\`
    : \`<strong>Sovrapprezzo: +€\${sovrVal}</strong>\`;

  const valoreCorrente = CFG.colore_speciale||'';
  const sistemaCorrente = valoreCorrente.startsWith('NCS')?'NCS':valoreCorrente.startsWith('PANTONE')?'PANTONE':'RAL';
  const codiceCorrente = valoreCorrente.replace(/^(RAL|NCS|PANTONE)\\s*/i,'');

  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:13px;font-weight:500">Colore speciale <span style="color:var(--mid);font-weight:400">— \${CFG.nome_serie||''} \${CFG.nome_modello||''}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('finitura')">← Indietro</button>
    </div>
    <div style="background:var(--blue-bg);border-radius:var(--radius);padding:12px 14px;font-size:12px;color:var(--blue-tx);margin-bottom:20px">
      Inserisci il codice del colore speciale. Verrà riportato esattamente su preventivo e conferma d'ordine.<br>\${sovrLabel}
    </div>
    <div style="display:flex;gap:12px;align-items:flex-end;margin-bottom:16px">
      <div style="flex:0 0 160px">
        <div style="font-size:11px;color:var(--mid);margin-bottom:6px;font-weight:500">SISTEMA COLORE</div>
        <select id="cfg-spec-sistema" style="width:100%;padding:9px 12px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:inherit">
          <option value="RAL" \${sistemaCorrente==='RAL'?'selected':''}>RAL</option>
          <option value="NCS" \${sistemaCorrente==='NCS'?'selected':''}>NCS</option>
          <option value="PANTONE" \${sistemaCorrente==='PANTONE'?'selected':''}>PANTONE</option>
        </select>
      </div>
      <div style="flex:1">
        <div style="font-size:11px;color:var(--mid);margin-bottom:6px;font-weight:500">CODICE COLORE</div>
        <input id="cfg-spec-codice" type="text" value="\${codiceCorrente}"
          placeholder="es. 9010 · S 0500-N · 7540 C"
          style="width:100%;padding:9px 12px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:inherit;box-sizing:border-box"
          oninput="aggiornaPreviewColoreSpec()">
      </div>
    </div>
    <div id="cfg-spec-preview" style="margin-bottom:20px;min-height:36px"></div>
    <div style="display:flex;justify-content:flex-end">
      <button class="btn btn-red btn-sm" onclick="confColoreSpeciale(\${sovrVal},'\${sovrTipo}')">Conferma colore →</button>
    </div>\`;
  if(codiceCorrente) aggiornaPreviewColoreSpec();
}

async function confColoreSpeciale(sovrVal, sovrTipo){
  const sistema = document.getElementById('cfg-spec-sistema')?.value||'RAL';
  const codice = document.getElementById('cfg-spec-codice')?.value?.trim()||'';
  if(!codice){ toast('Inserisci il codice colore','err'); return; }
  CFG.finitura='SPECIALE';
  CFG.nome_finitura=\`Colore speciale \${sistema} \${codice}\`;
  CFG.colore_speciale=\`\${sistema} \${codice}\`;
  CFG._consenteBugna=false;
  if(sovrTipo==='pct'){
    CFG._finitura_pct=sovrVal; CFG._finitura_fisso=0; CFG.p_finitura=0;
  } else {
    CFG._finitura_pct=0; CFG._finitura_fisso=sovrVal; CFG.p_finitura=sovrVal;
  }
  if(CFG._finitura_telaio_come_porta){
    CFG.finitura_telaio='SPECIALE'; CFG.nome_finitura_telaio=CFG.nome_finitura;
  }
  cfgUpdatePrice();
  await renderCfgStep('finitura_telaio');
}

// ── STEP COLORE TELAIO + COPRIFILI ─────────────────────────
// Di default il telaio (e i coprifili) seguono il colore della porta.
// Qui si può scegliere un colore diverso, applicato a telaio e coprifili insieme.
async function cfgFinituraTelaio(){
  var finQuery = sb.from('finiture').select('*')
    .eq('codice_serie',CFG.serie)
    .or(\`codice_modello.is.null,codice_modello.eq.\${CFG.modello}\`)
    .eq('attiva',true);
  const {data:tutteFiniture} = await finQuery.order('fascia').order('nome_finitura');
  const data = (tutteFiniture||[]).filter(f=>f.codice_finitura!=='SPECIALE');
  const hasSpeciale = (tutteFiniture||[]).some(f=>f.codice_finitura==='SPECIALE');

  // Raggruppa per fascia
  const fasce=[], fasciaMap={};
  data.forEach(f=>{ const fa=f.fascia||''; if(!fasciaMap[fa]){fasciaMap[fa]=[];fasce.push(fa);} fasciaMap[fa].push(f); });
  const fasciaStyle = {
    'LAMINATO':{bg:'#EDE7DE',tx:'var(--dark)',icon:'🟤'},
    'MP CLASSIC':{bg:'#E6DFD3',tx:'var(--dark)',icon:'⚪'},
    'MP LIGHT':{bg:'#E8F4FD',tx:'#1A5276',icon:'🔵'},
    'MP PREMIUM':{bg:'#FDF3E7',tx:'#784212',icon:'🟡'},
    '':{bg:'transparent',tx:'var(--mid)',icon:''},
  };
  const _ordFasce=['LAMINATO','MP CLASSIC','MP LIGHT','MP PREMIUM'];
  fasce.sort((a,b)=>{const ia=_ordFasce.indexOf(a),ib=_ordFasce.indexOf(b);return (ia<0?99:ia)-(ib<0?99:ib);});

  const comePorta = !!CFG._finitura_telaio_come_porta;
  let html='';
  fasce.forEach(fascia=>{
    const st=fasciaStyle[fascia]||fasciaStyle[''];
    if(fascia) html+=\`<div style="grid-column:1/-1;padding:6px 10px;border-radius:var(--radius);background:\${st.bg};color:\${st.tx};font-size:11px;font-weight:600;letter-spacing:0.5px;margin-top:4px">\${st.icon} \${fascia}</div>\`;
    fasciaMap[fascia].forEach(f=>{
      const sel = !comePorta && CFG.finitura_telaio===f.codice_finitura;
      html+=\`<div onclick="selFinituraTelaio('\${f.codice_finitura}','\${f.nome_finitura.replace(/'/g,"\\\\'")}')"
        style="border:\${sel?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px 12px;cursor:pointer;background:\${sel?'var(--red-bg)':'var(--white)'}">
        <div style="font-size:13px;font-weight:500;color:\${sel?'var(--red)':'var(--dark)'}">\${f.nome_finitura}</div>
      </div>\`;
    });
  });
  const specCard = hasSpeciale ? \`
    <div onclick="coloreSpecialeTelaio()"
      style="border:\${(!comePorta&&CFG.finitura_telaio==='SPECIALE')?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px 12px;cursor:pointer;background:\${(!comePorta&&CFG.finitura_telaio==='SPECIALE')?'var(--red-bg)':'var(--white)'};grid-column:1/-1;display:flex;align-items:center;gap:12px">
      <div style="width:36px;height:36px;border-radius:6px;background:linear-gradient(135deg,#e8d5f5,#d5e8f5,#f5e8d5);border:0.5px solid var(--border);flex-shrink:0"></div>
      <div><div style="font-size:13px;font-weight:500;color:\${(!comePorta&&CFG.finitura_telaio==='SPECIALE')?'var(--red)':'var(--dark)'}">Colore speciale telaio\${(!comePorta&&CFG.finitura_telaio==='SPECIALE'&&CFG._colore_speciale_telaio)?\` <span style="font-weight:400">— \${CFG._colore_speciale_telaio}</span>\`:''}</div>
        <div style="font-size:11px;color:var(--mid);margin-top:2px">RAL · NCS · PANTONE</div></div>
    </div>\` : '';

  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Colore telaio e coprifili</div>
      <button class="btn btn-sm" onclick="renderCfgStep('finitura')">← Colore porta</button>
    </div>
    <div style="background:var(--blue-bg);border-radius:var(--radius);padding:8px 12px;font-size:11px;color:var(--blue-tx);margin-bottom:12px">
      Il colore scelto qui vale per telaio <b>e</b> coprifili insieme. Di default seguono il colore della porta.
    </div>
    <div onclick="telaioComePorta()" style="border:\${comePorta?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:12px 14px;cursor:pointer;background:\${comePorta?'var(--red-bg)':'var(--white)'};margin-bottom:14px;display:flex;align-items:center;gap:12px">
      <div style="width:36px;height:36px;border-radius:6px;background:var(--beige);border:0.5px solid var(--border);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px">🚪</div>
      <div><div style="font-size:13px;font-weight:500;color:\${comePorta?'var(--red)':'var(--dark)'}">Stesso colore della porta</div>
      <div style="font-size:11px;color:var(--mid);margin-top:2px">\${CFG.nome_finitura||'—'}</div></div>
    </div>
    <div style="font-size:11px;color:var(--mid);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px">Oppure scegli un colore diverso per telaio e coprifili</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-height:calc(45vh);overflow-y:auto">\${html}\${specCard}</div>
    <div style="display:flex;justify-content:flex-end;margin-top:14px">
      <button class="btn btn-red btn-sm" onclick="renderCfgStep(cfgProssimoDopoFinitura())">Avanti →</button>
    </div>\`;
}

// Step successivo al colore telaio nel flusso porte (opzioni o apertura)
function cfgProssimoDopoFinitura(){
  const f = CFG._flags||{};
  const haOpzioni = f.ha_vetro||f.ha_pannello_o_bugna||f.ha_inserto_alluminio||f.ha_inserto_pietra||f.ha_pantografatura;
  return haOpzioni ? 'opzioni' : 'apertura';
}

function telaioComePorta(){
  CFG._finitura_telaio_come_porta=true;
  CFG.finitura_telaio=CFG.finitura;
  CFG.nome_finitura_telaio=CFG.nome_finitura;
  CFG._colore_speciale_telaio=null;
  renderCfgStep('finitura_telaio');
}

function selFinituraTelaio(cod, nome){
  CFG._finitura_telaio_come_porta=false;
  CFG.finitura_telaio=cod;
  CFG.nome_finitura_telaio=nome;
  CFG._colore_speciale_telaio=null;
  renderCfgStep('finitura_telaio');
}

function coloreSpecialeTelaio(){
  const sistema=(prompt('Sistema colore telaio (RAL / NCS / PANTONE):','RAL')||'').trim().toUpperCase();
  if(!sistema) return;
  const codice=(prompt('Codice colore (es. 9010):')||'').trim();
  if(!codice) return;
  CFG._finitura_telaio_come_porta=false;
  CFG.finitura_telaio='SPECIALE';
  CFG._colore_speciale_telaio=\`\${sistema} \${codice}\`;
  CFG.nome_finitura_telaio=\`Colore speciale \${sistema} \${codice}\`;
  renderCfgStep('finitura_telaio');
}

async function cfgOpzioni(){
  const f = CFG._flags || {};

  // Se non ci sono opzioni disponibili, salta direttamente all'apertura
  const haOpzioni = f.ha_pannello_o_bugna || f.ha_inserto_alluminio || 
                    f.ha_inserto_pietra || (f.ha_vetro && !CFG._vetroIncluso) || 
                    f.ha_pantografatura;
  if(!haOpzioni){
    await renderCfgStep('apertura');
    return;
  }

  let html = \`<div style="font-size:13px;font-weight:500;margin-bottom:14px">Opzioni aggiuntive <span style="color:var(--mid);font-weight:400">— \${CFG.nome_modello} / \${CFG.nome_finitura}</span></div>\`;

  // PANNELLO O BUGNA
  if(f.ha_pannello_o_bugna){
    html+=\`<div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:500;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Pannello o bugna</div>
      <div style="display:flex;gap:10px">
        <div onclick="CFG.pannello_bugna='pannello';CFG.p_bugna=0;cfgOpzioniUpdate()" style="flex:1;border:\${CFG.pannello_bugna==='pannello'?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px;cursor:pointer;text-align:center;background:\${CFG.pannello_bugna==='pannello'?'var(--red-bg)':'var(--white)'}">
          <div style="font-size:13px;font-weight:500">Pannello liscio</div>
        </div>
        \${CFG._consenteBugna?\`<div onclick="selBugna()" style="flex:1;border:\${CFG.pannello_bugna==='bugna'?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px;cursor:pointer;text-align:center;background:\${CFG.pannello_bugna==='bugna'?'var(--red-bg)':'var(--white)'}">
          <div style="font-size:13px;font-weight:500">Bugna</div>
        </div>\`:'<div style="flex:1;border:0.5px solid var(--border);border-radius:var(--radius);padding:10px;text-align:center;opacity:0.4;"><div style="font-size:13px">Bugna non disponibile per questa finitura</div></div>'}
      </div>
    </div>\`;
  }

  // INSERTO ALLUMINIO
  if(f.ha_inserto_alluminio){
    const {data:colAlu} = await sb.from('colori_inserto_alluminio').select('*').order('nome');
    const optsAlu = (colAlu||[]).map(c=>\`
      <div onclick="selAlu('\${c.codice}','\${c.nome}',\${c.incluso?0:(c.sovrapprezzo_a||0)})"
        style="border:\${CFG.colore_alu===c.codice?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:8px 12px;cursor:pointer;background:\${CFG.colore_alu===c.codice?'var(--red-bg)':'var(--white)'}">
        <div style="font-size:13px;font-weight:500">\${c.nome}</div>
        <div style="font-size:11px;color:var(--mid)">\${c.incluso?'Incluso':c.sovrapprezzo_a?'+€'+c.sovrapprezzo_a:'€ 0'}</div>
      </div>\`).join('');
    html+=\`<div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:500;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Colore inserto alluminio</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">\${optsAlu}</div>
    </div>\`;
  }

  // INSERTO PIETRA
  if(f.ha_inserto_pietra){
    const {data:colPietra} = await sb.from('colori_pietra').select('*').order('nome');
    const optsPietra = (colPietra||[]).map(c=>\`
      <div onclick="selPietra('\${c.codice}','\${c.nome}',\${c[\`sovrapprezzo_\${listino().toLowerCase()}\`]||0})"
        style="border:\${CFG.colore_pietra===c.codice?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:8px 12px;cursor:pointer;background:\${CFG.colore_pietra===c.codice?'var(--red-bg)':'var(--white)'}">
        <div style="font-size:13px;font-weight:500">\${c.nome}</div>
        <div style="font-size:11px;color:var(--mid)">\${c[\`sovrapprezzo_\${listino().toLowerCase()}\`]?'+€'+c[\`sovrapprezzo_\${listino().toLowerCase()}\`]:'Incluso'}</div>
      </div>\`).join('');
    html+=\`<div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:500;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Colore pietra</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">\${optsPietra||'<p style="color:var(--mid);font-size:13px">Nessun colore pietra configurato — aggiungili dal pannello admin</p>'}</div>
    </div>\`;
  }

  // VETRO
  if(f.ha_vetro && !CFG._vetroIncluso){
    const {data:pm} = await sb.from('prezzi_modello').select('prezzo_vetro').eq('codice_modello',CFG.modello).eq('listino',listino()).single();
    const prezzoVetroBase = pm?.prezzo_vetro||0;
    const {data:tipiV} = await sb.from('tipi_vetro').select('*').eq('attivo',true).order('nome');
    const optsV = (tipiV||[]).map(tv=>{
      const totV = prezzoVetroBase + (tv[\`sovrapprezzo_\${listino().toLowerCase()}\`]||0);
      return \`<div onclick="selVetro('\${tv.codice}','\${tv.nome}',\${totV})"
        style="border:\${CFG.tipo_vetro===tv.codice?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:8px 12px;cursor:pointer;background:\${CFG.tipo_vetro===tv.codice?'var(--red-bg)':'var(--white)'}">
        <div style="font-size:13px;font-weight:500">\${tv.nome}</div>
        <div style="font-size:11px;color:var(--mid)">€ \${totV.toLocaleString('it-IT',{minimumFractionDigits:2})}</div>
      </div>\`;
    }).join('');
    html+=\`<div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:500;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Tipo di vetro</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">\${optsV}</div>
    </div>\`;
  }

  // EXTRA INCISIONI
  if(CFG._haExtraIncisioni){
    const {data:pm} = await sb.from('prezzi_modello').select('prezzo_extra_incisioni').eq('codice_modello',CFG.modello).eq('listino',listino()).single();
    const prezzoExtra = pm?.prezzo_extra_incisioni||0;
    html+=\`<div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:500;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Incisioni decorative</div>
      <div style="display:flex;gap:10px">
        <div onclick="CFG.p_extra_incisioni=0;cfgOpzioniUpdate()" style="flex:1;border:\${CFG.p_extra_incisioni===0?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px;cursor:pointer;text-align:center;background:\${CFG.p_extra_incisioni===0?'var(--red-bg)':'var(--white)'}">
          <div style="font-size:13px;font-weight:500">Senza incisioni</div>
        </div>
        <div onclick="CFG.p_extra_incisioni=\${prezzoExtra};cfgOpzioniUpdate()" style="flex:1;border:\${CFG.p_extra_incisioni>0?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px;cursor:pointer;text-align:center;background:\${CFG.p_extra_incisioni>0?'var(--red-bg)':'var(--white)'}">
          <div style="font-size:13px;font-weight:500">Con incisioni</div>
          <div style="font-size:12px;color:var(--mid)">+€ \${prezzoExtra.toLocaleString('it-IT',{minimumFractionDigits:2})}</div>
        </div>
      </div>
    </div>\`;
  }

  html+=\`<div style="display:flex;justify-content:space-between;margin-top:16px">
    <button class="btn btn-sm" onclick="renderCfgStep('finitura')">← Indietro</button>
    <button class="btn btn-red btn-sm" onclick="renderCfgStep('apertura')">Avanti →</button>
  </div>\`;

  document.getElementById('cfg-body').innerHTML=html;
  cfgUpdatePrice();
}

function cfgOpzioniUpdate(){ cfgOpzioni(); }
async function selBugna(){
  const {data:fin} = await sb.from('finiture').select('sovrapprezzo_bugna_A,sovrapprezzo_bugna_P').eq('codice_finitura',CFG.finitura).eq('codice_serie',CFG.serie).single();
  CFG.pannello_bugna='bugna'; CFG.p_bugna=fin?.[\`sovrapprezzo_bugna_\${listino()}\`]||0;
  cfgOpzioniUpdate();
}
function selAlu(cod,nome,sovr){ CFG.colore_alu=cod;CFG.nome_colore_alu=nome;CFG.p_inserto=sovr; cfgUpdatePrice(); renderCfgStep('apertura'); }
function selPietra(cod,nome,sovr){ CFG.colore_pietra=cod;CFG.nome_colore_pietra=nome;CFG.p_inserto=sovr; cfgUpdatePrice(); renderCfgStep('apertura'); }
function selVetro(cod,nome,prezzo){ CFG.tipo_vetro=cod;CFG.nome_tipo_vetro=nome;CFG.p_vetro=prezzo; cfgUpdatePrice(); cfgOpzioniUpdate(); }

async function cfgApertura(){
  const [{data:ap},{data:sensi}] = await Promise.all([
    sb.from('tipologie_apertura').select('*').eq('attiva',true).order('codice'),
    sb.from('sensi_apertura').select('*'),
  ]);

  // Famiglia order and labels from Excel
  const famOrder = ['BAT','CS','LIBRO','SALOON','ROTOTRASLANTI','SPECIALI','SCORREVOLI INTERNO MURO','SCORREVOLI ESTERNO MURO','FILO MURO','COMPLANARI','PASSATE'];
  const famLabels = {
    'BAT':'Battente con anuba registrabili',
    'CS':'Senza battura con cerniere a scomparsa',
    'LIBRO':'A libro',
    'SALOON':'Va e vieni (Saloon)',
    'ROTOTRASLANTI':'Rototraslante',
    'SPECIALI':'Speciali',
    'SCORREVOLI INTERNO MURO':'Scorrevole interno muro',
    'SCORREVOLI ESTERNO MURO':'Scorrevole esterno muro',
    'FILO MURO':'Filo muro',
    'COMPLANARI':'Complanare',
    'PASSATE':'Passata (stipite senza anta)',
  };

  // Build map codice→sensi from sensi_apertura
  const sensiMap = {};
  (sensi||[]).forEach(s=>{
    if(!sensiMap[s.codice_apertura]) sensiMap[s.codice_apertura]=[];
    sensiMap[s.codice_apertura].push(s);
  });

  // Filtra aperture per compatibilità (es. modello GC non compatibile con LIBRO)
  const apFiltrate = await filtraPerCompatibilita(ap||[], 'apertura', 'codice');

  // Group aperture by famiglia from sensi_apertura (more accurate than tipologie_apertura.famiglia)
  const gruppi = {};
  apFiltrate.forEach(a=>{
    const s = sensiMap[a.codice];
    const fam = s?.[0]?.famiglia || a.famiglia || 'ALTRO';
    if(!gruppi[fam]) gruppi[fam]=[];
    gruppi[fam].push(a);
  });

  let html=\`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
    <div style="font-size:13px;font-weight:500">Tipologia di apertura</div>
    <button class="btn btn-sm" onclick="renderCfgStep((CFG._flags?.ha_vetro||CFG._flags?.ha_pannello_o_bugna||CFG._flags?.ha_inserto_alluminio||CFG._flags?.ha_inserto_pietra||CFG._flags?.ha_pantografatura)?'opzioni':'finitura')">← Indietro</button>
  </div>\`;

  // Render in correct family order
  const orderedFams = [...famOrder.filter(f=>gruppi[f]), ...Object.keys(gruppi).filter(f=>!famOrder.includes(f))];

  orderedFams.forEach(fam=>{
    const aps = gruppi[fam];
    if(!aps||!aps.length) return;
    html+=\`<div style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;color:var(--mid);margin:14px 0 6px;padding-bottom:4px;border-bottom:0.5px solid var(--border)">\${famLabels[fam]||fam}</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:4px">\`;
    aps.forEach(a=>{
      const sp = a.logica_prezzo==='fisso'?(a[\`sovrapprezzo_\${listino().toLowerCase()}\`]||0):null;
      const prezzoLabel = a.logica_prezzo==='spessore'?'Prezzo dipende dallo spessore muro':
        a.logica_prezzo==='percentuale'?'Maggiorazione +'+a.maggiorazione_pct+'%':
        a.logica_prezzo==='doppio'?'Prezzo doppio':
        sp>0?'Sovrapprezzo +€'+sp:'Inclusa nel prezzo porta';
      const isSelected = CFG.apertura===a.codice;
      // Short description from nome (remove long details)
      const desc = a.nome ? a.nome.replace(a.codice,'').trim() : '';
      html+=\`<div onclick="selApertura('\${a.codice.replace(/'/g,"\\\\'")}','\${a.nome.replace(/'/g,"\\\\'")}','\${a.logica_prezzo}',\${sp||0},\${a.doppio_prezzo||false},\${a.maggiorazione_pct||0})"
        style="border:\${isSelected?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px;cursor:pointer;background:\${isSelected?'var(--red-bg)':'var(--white)'};display:flex;flex-direction:column;gap:3px">
        <div style="font-size:13px;font-weight:700;color:\${isSelected?'var(--red)':'var(--dark)'}">\${a.codice}</div>
        <div style="font-size:11px;color:\${isSelected?'var(--red)':'var(--mid)'};line-height:1.4;flex:1">\${desc}</div>
        <div style="font-size:10px;color:\${sp>0?'var(--amber-tx)':isSelected?'var(--green-tx)':'var(--green-tx)'};margin-top:4px;font-weight:500">\${prezzoLabel}</div>
      </div>\`;
    });
    html+='</div>';
  });

  document.getElementById('cfg-body').innerHTML=html;
}

async function selApertura(cod, nome, logica, sovr, doppio, magg){
  // Reset serratura/cilindro solo se l'apertura cambia davvero
  if(CFG.apertura !== cod){ CFG.serratura=null; CFG.nome_serratura=''; CFG.cilindro=null; CFG.nome_cilindro=''; }
  CFG.apertura=cod; CFG.nome_apertura=nome;
  CFG._logicaApertura=logica; CFG._maggApertura=magg; CFG._doppioApertura=doppio;

  // Calcola supplemento apertura base
  if(logica==='fisso') CFG.p_apertura=sovr;
  else if(logica==='percentuale') CFG.p_apertura=Math.round(CFG.p_base*(magg/100)*100)/100;
  else CFG.p_apertura=0;

  // Supplemento Varsavia (staffe obbligatorie)
  CFG._p_varsavia=0;
  if(CFG.modello==='VAR'){
    const isScorrevole=['SI','SE'].some(x=>cod.startsWith(x));
    if(isScorrevole){
      const isDoppia = cod.includes('2A');
      const {data:varMod}=await sb.from('modelli').select('supplemento_staffe_a,supplemento_staffe_p').eq('codice','VAR').limit(1);
      const lst=listino().toLowerCase();
      const staffe=varMod?.[0]?.[\`supplemento_staffe_\${lst}\`]||0;
      CFG._p_varsavia=isDoppia?staffe*2:staffe;
    }
  }

  // Flag doppia anta
  CFG._isDoppiaAnta = cod==='BAT2A'||cod==='CS2A'||cod.includes('2A');

  // Per COM e FM: il supplemento dipende dalla famiglia serie+finitura
  // Verrà (ri)calcolato in calcolaSupplementoComFm() dopo la scelta della finitura
  // Per ora non resettiamo p_apertura se già calcolato
  if(cod.startsWith('COM')||cod.startsWith('FM')){
    CFG._needsComFmSuppl=true;
  } else {
    CFG._needsComFmSuppl=false;
  }

  cfgUpdatePrice();

  // Carica sensi disponibili per questa apertura
  const {data:sensi} = await sb.from('sensi_apertura').select('*').eq('codice_apertura',cod).eq('attivo',true).order('ordine');

  if(!sensi||sensi.length===0){
    CFG.senso=null;
    await renderCfgStep('misure');
    return;
  }

  if(sensi.length===1 && (sensi[0].codice_senso==='BIDIREZIONALE'||sensi[0].codice_senso==='NESSUNO'||sensi[0].codice_senso==='X')){
    CFG.senso=sensi[0].codice_senso;
    await renderCfgStep('misure');
    return;
  }

  await cfgSenso(sensi);
}

// Cache dei codici serie "laccate" (usano fascia/pct). Popolata dal DB in cfgSerie/loadSerieLaccate.
// Fallback ai codici storici finché la cache non è pronta.
window._serieLaccate = null;
function isSerieLaccata(cod){
  if(!cod) return false;
  if(window._serieLaccate) return window._serieLaccate.has(cod);
  return ['LAC','GEO','GL','JAD','ACC','PAN-BL'].includes(cod);
}
async function loadSerieLaccate(){
  try{
    const {data} = await sb.from('serie').select('codice,e_laccata');
    window._serieLaccate = new Set((data||[]).filter(s=>s.e_laccata).map(s=>s.codice));
  }catch(e){ /* resta il fallback */ }
}

// Determina famiglia serie per COM/FM
function famigliaSerie(){
  const s=CFG.serie||'';
  const f=CFG.finitura||'';
  if(f==='GREZZA') return 'GREZZA';
  if(isSerieLaccata(s)) return 'LACCATA';
  return 'TAM_MAS';
}

// Calcola supplemento COM/FM in base a famiglia serie
async function calcolaSupplementoComFm(){
  if(!CFG._needsComFmSuppl) return;
  const cod=CFG.apertura||'';
  const fam=famigliaSerie();
  const {data}=await sb.from('supplementi_apertura')
    .select('*').eq('codice_apertura',cod).eq('famiglia_serie',fam).limit(1);
  const lst=listino().toLowerCase();
  CFG.p_apertura=(data?.[0]?.[\`supplemento_\${lst}\`])||0;
  cfgUpdatePrice();
}

async function cfgSenso(sensi){
  updateCfgStepper('misure'); // stepper rimane su misure visivamente
  const cards=sensi.map(s=>{
    const isSelected=CFG.senso===s.codice_senso;
    return \`<div onclick="selSenso('\${s.codice_senso}','\${(s.descrizione_senso||'').replace(/'/g,"\\\\'")}')"
      style="border:\${isSelected?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:14px 16px;cursor:pointer;background:\${isSelected?'var(--red-bg)':'var(--white)'};display:flex;flex-direction:column;gap:4px">
      <div style="font-size:16px;font-weight:700;color:\${isSelected?'var(--red)':'var(--dark)'}">\${s.codice_senso}</div>
      <div style="font-size:12px;color:\${isSelected?'var(--red)':'var(--mid)'}">\${s.descrizione_senso||''}</div>
    </div>\`;
  }).join('');

  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <div style="font-size:13px;font-weight:500">Senso di apertura <span style="color:var(--mid);font-weight:400">— \${CFG.apertura}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('apertura')">← Indietro</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">\${cards}</div>\`;
}

async function selSenso(senso, desc){
  CFG.senso=senso;
  await renderCfgStep('serratura');
}

async function cfgMisure(){
  // Determina famiglia misure in base al codice apertura
  const ap = CFG.apertura||'';
  const famMisure = 
    ap.startsWith('SI') ? 'SI' :
    ap.startsWith('SE') ? 'SE' :
    ap.startsWith('FM') ? 'FM' :
    ap.startsWith('COM') ? 'COM' :
    ap.startsWith('CS') ? 'CS' :
    ap.startsWith('LIBRO') || ap==='1/3 - 2/3' ? 'LIBRO' :
    ap==='ROTO' ? 'ROTO' :
    ap.startsWith('V/V') || ap.startsWith('SALOON') ? 'SALOON' :
    ap==='TRAP' ? 'SPECIALI' : 'BAT';

  CFG._famMisure = famMisure;

  const {data:misure} = await sb.from('misure_standard').select('*')
    .eq('famiglia_apertura',famMisure)
    .gt('larghezza_mm',0).gt('altezza_mm',0)
    .order('larghezza_mm').order('altezza_mm');

  const larghezze = [...new Set((misure||[]).map(m=>m.larghezza_mm))].sort((a,b)=>a-b);
  const altezze = [...new Set((misure||[]).map(m=>m.altezza_mm))].sort((a,b)=>a-b);

  // Serializza misure per passarle ai click handler
  window._cfgMisureCorrente = misure||[];

  let html=\`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
    <div style="font-size:13px;font-weight:500">Misure porta <span style="color:var(--mid);font-weight:400">— \${CFG.nome_apertura} (\${famMisure})</span></div>
    <button class="btn btn-sm" onclick="renderCfgStep('apertura')">← Indietro</button>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
    <div>
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Larghezza (mm)</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        \${larghezze.map(l=>\`<div onclick="selLarghezza(\${l})" style="padding:6px 12px;border-radius:var(--radius);border:\${(!CFG._lCustom&&CFG.larghezza===l)?'2px solid var(--red)':'0.5px solid var(--border)'};cursor:pointer;font-size:13px;font-weight:500;background:\${(!CFG._lCustom&&CFG.larghezza===l)?'var(--red-bg)':'var(--white)'};">\${l}</div>\`).join('')}
      </div>
    </div>
    <div>
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Altezza (mm)</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        \${altezze.map(a=>\`<div onclick="selAltezza(\${a})" style="padding:6px 12px;border-radius:var(--radius);border:\${(!CFG._hCustom&&CFG.altezza===a)?'2px solid var(--red)':'0.5px solid var(--border)'};cursor:pointer;font-size:13px;font-weight:500;background:\${(!CFG._hCustom&&CFG.altezza===a)?'var(--red-bg)':'var(--white)'};">\${a}</div>\`).join('')}
      </div>
    </div>
  </div>
  <div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--amber-tx);margin-bottom:12px">
    Misura non presente nell'elenco? Inseriscila manualmente — verrà marcata come <strong>misura custom</strong> e richiederà approvazione tecnica.
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px">
    <div>
      <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Larghezza custom (mm)</div>
      <input type="number" id="cfg-larg-custom" value="\${CFG._lCustom?CFG.larghezza:''}" placeholder="es. 870" min="300" max="3000" style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="selLarghezzaCustom(this.value)">
    </div>
    <div>
      <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Altezza custom (mm)</div>
      <input type="number" id="cfg-alt-custom" value="\${CFG._hCustom?CFG.altezza:''}" placeholder="es. 2100" min="1000" max="4000" style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="selAltezzaCustom(this.value)">
    </div>
  </div>
  \${CFG.misura_custom?'<div style="background:var(--red-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--red-tx);margin-bottom:12px">⚠ Misura custom — richiederà approvazione tecnica</div>':''}
  <div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--amber-tx);margin-bottom:12px">
    <strong>Fuori misura:</strong> larghezze non in elenco → +40% · altezze non in elenco → +20% (o €45 per CL/LCL) · h&gt;2100mm solo laccate con scorrevole/FM
  </div>
  <div style="display:flex;justify-content:flex-end">
    <button class="btn btn-red btn-sm" onclick="avanzaASpessore()">Avanti →</button>
  </div>\`;
  document.getElementById('cfg-body').innerHTML=html;
}

function selLarghezza(v){
  CFG.larghezza=v; CFG._lCustom=false;
  CFG.misura_custom = !!CFG._hCustom;   // custom solo se l'altezza è custom
  aggiornaSuprMisura(window._cfgMisureCorrente||[]);
  cfgMisure();
}
function selAltezza(v){
  CFG.altezza=v; CFG._hCustom=false;
  CFG.misura_custom = !!CFG._lCustom;   // custom solo se la larghezza è custom
  aggiornaSuprMisura(window._cfgMisureCorrente||[]);
  cfgMisure();
}
function aggiornaSuprMisura(misure){
  if(!misure||!CFG.larghezza||!CFG.altezza){ return; }
  const m = misure.find(x=>x.larghezza_mm===CFG.larghezza && x.altezza_mm===CFG.altezza);
  if(!m){ CFG._p_misura=0; CFG._pct_misura=0; return; }
  const lst = listino().toLowerCase();
  const pct = m[\`sovrapprezzo_pct_\${lst}\`]||0;
  const fisso = m[\`sovrapprezzo_\${lst}\`]||0;
  if(pct>0){ CFG._pct_misura=pct; CFG._p_misura=0; }
  else { CFG._p_misura=fisso; CFG._pct_misura=0; }
  cfgUpdatePrice();
}
function selLarghezzaCustom(v){
  if(v){ CFG.larghezza=parseFloat(v); CFG._lCustom=true; }
  else { CFG._lCustom=false; }
  CFG.misura_custom = !!(CFG._lCustom||CFG._hCustom);
  CFG._p_misura=0; CFG._pct_misura=0;
}
function selAltezzaCustom(v){
  if(v){ CFG.altezza=parseFloat(v); CFG._hCustom=true; }
  else { CFG._hCustom=false; }
  CFG.misura_custom = !!(CFG._lCustom||CFG._hCustom);
  CFG._p_misura=0; CFG._pct_misura=0;
}
async function avanzaASpessore(){
  if(!CFG.larghezza||!CFG.altezza){ toast('Seleziona larghezza e altezza','err'); return; }

  // Calcola supplemento COM/FM ora che abbiamo finitura+serie
  await calcolaSupplementoComFm();

  // Determina misure standard dalla famiglia già calcolata in cfgMisure
  const famMisure = CFG._famMisure || 'BAT';
  const {data:misure}=await sb.from('misure_standard').select('*')
    .eq('famiglia_apertura',famMisure).gt('larghezza_mm',0).gt('altezza_mm',0);
  const larghezzeStd=new Set((misure||[]).map(m=>m.larghezza_mm));
  const altezzeStd=new Set((misure||[]).map(m=>m.altezza_mm));

  const isFuoriH = !altezzeStd.has(CFG.altezza);
  const isFuoriL = !larghezzeStd.has(CFG.larghezza);
  const isLaccata = isSerieLaccata(CFG.serie||'');
  const isMassellata = CFG.serie==='MAS';
  const isModelloCLLCL = ['CL','LCL'].includes(CFG.modello||'');
  const isScorrevole = ['SI','SE'].some(x=>(CFG.apertura||'').startsWith(x));
  const isFM = (CFG.apertura||'').startsWith('FM');

  // Validazione altezza >2100 mm — solo laccate con scorrevole o filo muro
  if(CFG.altezza>2100){
    if(!isLaccata){
      toast('Altezza >2100 mm disponibile solo per porte laccate con tipologia scorrevole o filo muro','err');
      return;
    }
    if(!isScorrevole && !isFM){
      toast('Altezza >2100 mm disponibile solo con tipologia scorrevole o filo muro','err');
      return;
    }
  }

  // Reset supplementi fuori misura
  CFG._p_fuori_h=0; CFG._p_fuori_l=0;
  CFG._isFuoriH=false; CFG._isFuoriL=false;

  // Supplemento fuori misura H (<210 o >210)
  if(isFuoriH){
    CFG._isFuoriH=true;
    if(isMassellata){
      // Massellate: nessun supplemento h
    } else if(isModelloCLLCL){
      CFG._p_fuori_h=45;
    } else {
      // +20% su (base + finitura + apertura + telaio)
      CFG._fuori_h_pct=20;
    }
  }

  // Supplemento fuori misura L (+40% su tutto)
  if(isFuoriL){
    CFG._isFuoriL=true;
    CFG._fuori_l_pct=40;
  }

  // Ricalcola con supplementi
  cfgUpdatePrice();
  renderCfgStep('spessore');
}

async function cfgSpessore(){
  const fam = CFG.apertura?.startsWith('SI')?'SI':
    CFG.apertura?.startsWith('SE')?'SE':
    CFG.apertura?.startsWith('FM')?'FM':
    CFG.apertura==='COM'?'COM':
    CFG.apertura==='ROTO'?'ROTO':
    CFG.apertura?.startsWith('CS')?'CS':'BAT';

  const escl = !!CFG.escludi_telaio;
  let html=\`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
    <div style="font-size:13px;font-weight:500">Spessore muro e telaio <span style="color:var(--mid);font-weight:400">— \${CFG.larghezza}×\${CFG.altezza} mm \${CFG.senso}</span></div>
    <button class="btn btn-sm" onclick="renderCfgStep('misure')">← Indietro</button>
  </div>
  <label style="display:flex;align-items:center;gap:8px;margin-bottom:14px;padding:8px 12px;background:var(--beige);border-radius:var(--radius);cursor:pointer">
    <input type="checkbox" \${escl?'checked':''} onchange="toggleEscludiTelaio(this.checked,'\${fam}')">
    <span style="font-size:12px;color:var(--dark)"><strong>Escludi telaio</strong> — es. solo anta di ricambio senza telaio</span>
  </label>
  <div id="cfg-spessore-wrap" style="display:\${escl?'none':'block'}">
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Spessore muro (mm)</div>
      <div style="display:flex;align-items:center;gap:10px">
        <input type="number" id="cfg-spessore" value="\${CFG.spessore||''}" placeholder="es. 125" step="0.5" min="5" max="60"
          style="width:120px;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:inherit"
          oninput="calcolaTelaio(this.value,'\${fam}')">
        <span style="font-size:13px;color:var(--mid)">mm</span>
      </div>
    </div>
    <div id="cfg-telaio-result" style="margin-bottom:14px"></div>
  </div>
  <div style="display:flex;justify-content:flex-end">
    <button class="btn btn-red btn-sm" onclick="avanzaAFerramenta()">Avanti →</button>
  </div>\`;
  document.getElementById('cfg-body').innerHTML=html;
  if(!escl && CFG.spessore) calcolaTelaio(CFG.spessore, fam);
}

// Spunta "escludi telaio": azzera spalla/telaio e nasconde il blocco spessore
function toggleEscludiTelaio(checked, fam){
  CFG.escludi_telaio = !!checked;
  const wrap = document.getElementById('cfg-spessore-wrap');
  if(wrap) wrap.style.display = checked ? 'none' : 'block';
  if(checked){
    CFG.spessore=null; CFG.spalla=null; CFG.accessorio_telaio=null;
    CFG.p_telaio=0; CFG.p_acc_telaio=0; CFG._cassone=null;
  } else if(CFG.spessore){
    calcolaTelaio(CFG.spessore, fam);
  }
  cfgUpdatePrice();
}

async function calcolaTelaio(spessore, fam){
  const sp = parseFloat(spessore);
  if(!sp||sp<5){ document.getElementById('cfg-telaio-result').innerHTML=''; return; }
  CFG.spessore=sp;

  // Per scorrevoli interni usiamo logica cassone
  if(fam==='SI'){
    const {data:kits} = await sb.from('scorrevoli_interni')
      .select('*').eq('codice_apertura',CFG.apertura).order('spalla_cassone_cm');
    if(!kits||kits.length===0){
      document.getElementById('cfg-telaio-result').innerHTML=\`<div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px;font-size:12px;color:var(--amber-tx)">Nessun kit cassone configurato per questa tipologia.</div>\`;
      return;
    }
    let html=\`<div style="font-size:12px;font-weight:500;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Seleziona il cassone</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">\`;
    kits.forEach(k=>{
      const prezzo = k[\`prezzo_\${listino().toLowerCase()}\`]||0;
      html+=\`<div onclick="selCassone('\${k.kit_telaio_codice}',\${prezzo},'\${k.codice_cassone}')"
        style="border:\${CFG.spalla===k.kit_telaio_codice?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:8px 10px;cursor:pointer;background:\${CFG.spalla===k.kit_telaio_codice?'var(--red-bg)':'var(--white)'}">
        <div style="font-size:12px;font-weight:500">\${k.codice_cassone}</div>
        <div style="font-size:11px;color:var(--mid)">\${k.spalla_cassone_cm} cm</div>
        <div style="font-size:12px;color:var(--red);font-weight:500">\${prezzo?'€ '+prezzo:'Da definire'}</div>
      </div>\`;
    });
    html+='</div>';
    document.getElementById('cfg-telaio-result').innerHTML=html;
    return;
  }

  // Per tutti gli altri: regole_telaio
  const {data:regole} = await sb.from('regole_telaio')
    .select('*').eq('famiglia_apertura',fam)
    .lte('spessore_da_cm',sp).gte('spessore_a_cm',sp);

  if(!regole||regole.length===0){
    document.getElementById('cfg-telaio-result').innerHTML=\`<div style="background:var(--red-bg);border-radius:var(--radius);padding:10px;font-size:12px;color:var(--red-tx)">Spessore fuori range — contattare l'ufficio tecnico.</div>\`;
    return;
  }
  const regola = regole[0];
  const {data:spalla} = await sb.from('telai_spalle')
    .select('*').eq('codice',regola.codice_spalla).eq('famiglia_apertura',fam).maybeSingle();
  const prezzoSpalla = spalla?.[\`prezzo_\${listino().toLowerCase()}\`]||0;
  const prezzoAcc = regola[\`prezzo_access_\${listino()}\`]||0;

  CFG.spalla=regola.codice_spalla;
  CFG.accessorio_telaio=regola.tipo_accessorio!=='nessuno'?regola.tipo_accessorio:null;
  CFG.p_telaio=prezzoSpalla;
  CFG.p_acc_telaio=prezzoAcc;

  let note='';
  if(regola.nota) note=\`<div style="font-size:11px;color:var(--mid);margin-top:4px">\${regola.nota}</div>\`;

  let accHtml='';
  if(regola.tipo_accessorio&&regola.tipo_accessorio!=='nessuno'){
    accHtml=\`<div style="margin-top:8px;padding:8px 10px;background:var(--amber-bg);border-radius:var(--radius);font-size:12px;color:var(--amber-tx)">
      Accessorio necessario: <strong>\${regola.tipo_accessorio}</strong> \${regola.cm_accessorio?regola.cm_accessorio+' mm':''} 
      — \${prezzoAcc?'€ '+prezzoAcc:'prezzo da definire'}
      \${regola.note?'<br><span style="font-size:11px">'+regola.note+'</span>':''}
    </div>\`;
  }

  document.getElementById('cfg-telaio-result').innerHTML=\`
    <div style="background:var(--beige);border-radius:var(--radius);padding:12px 14px;border:0.5px solid var(--border)">
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;color:var(--mid);text-transform:uppercase;letter-spacing:0.4px">Telaio abbinato automaticamente</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:14px;font-weight:500">Spalla \${regola.codice_spalla} — \${spalla?.spalla_cm||'?'} mm</div>
          \${note}
        </div>
        <div style="font-size:14px;font-weight:500;color:var(--red)">\${prezzoSpalla?'€ '+prezzoSpalla:'Prezzo da definire'}</div>
      </div>
      \${accHtml}
    </div>\`;
  cfgUpdatePrice();
}

function selCassone(kit, prezzo, cassone){
  CFG.spalla=kit; CFG.p_telaio=prezzo; CFG._cassone=cassone;
  cfgUpdatePrice();
}

function avanzaAFerramenta(){
  if(!CFG.escludi_telaio && !CFG.spessore){ toast('Inserisci lo spessore del muro (o spunta "Escludi telaio")','err'); return; }
  renderCfgStep('coprifili');
}

// ── STEP COPRIFILI ────────────────────────────────────────
// Set per apertura (larghezza profilo + n. aste). Il colore segue la finitura
// telaio; la lunghezza (2250/3000) si risolve allo scarico in base al sopraluce.
const COPRIFILO_LARGHEZZE_CFG = [65, 90];
async function cfgCoprifili(){
  // Carica il set dell'apertura una volta sola
  if(CFG._coprifili_set===undefined || CFG._coprifili_set_apertura !== CFG.apertura){
    const {data:set} = await sb.from('coprifili_set')
      .select('*').eq('codice_apertura',CFG.apertura).limit(1);
    CFG._coprifili_set = (set&&set[0]) || null;
    CFG._coprifili_set_apertura = CFG.apertura;
    // Precarica lo standard solo se la posizione non è già configurata
    if(CFG.coprifili_larghezza==null){
      if(CFG._coprifili_set){
        CFG.coprifili_larghezza = CFG._coprifili_set.larghezza_mm || 65;
        CFG.coprifili_aste = CFG._coprifili_set.aste!=null ? parseFloat(CFG._coprifili_set.aste) : 5;
        // Se il set dell'apertura ha "Previsti" off, escludi di default
        if(CFG._coprifili_set.attivo===false && !CFG.escludi_coprifili) CFG.escludi_coprifili=true;
      } else {
        CFG.coprifili_larghezza = 65; CFG.coprifili_aste = 5;
      }
    }
  }
  ricalcolaPrezzoCoprifili();

  const escl = !!CFG.escludi_coprifili;
  const set = CFG._coprifili_set;
  const larg = CFG.coprifili_larghezza||65;
  const aste = CFG.coprifili_aste!=null?CFG.coprifili_aste:5;
  const colore = CFG.nome_finitura_telaio || CFG.nome_finitura || '—';
  const suppSet = set? (parseFloat(set.supplemento)||0) : 0;
  const largOpts = COPRIFILO_LARGHEZZE_CFG.map(w=>\`<option value="\${w}" \${larg==w?'selected':''}>\${w} mm</option>\`).join('');

  let html=\`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
    <div style="font-size:13px;font-weight:500">Coprifili <span style="color:var(--mid);font-weight:400">— \${CFG.nome_apertura||CFG.apertura||''}</span></div>
    <button class="btn btn-sm" onclick="renderCfgStep('spessore')">← Indietro</button>
  </div>
  <label style="display:flex;align-items:center;gap:8px;margin-bottom:14px;padding:8px 12px;background:var(--beige);border-radius:var(--radius);cursor:pointer">
    <input type="checkbox" \${escl?'checked':''} onchange="toggleEscludiCoprifili(this.checked)">
    <span style="font-size:12px;color:var(--dark)"><strong>Escludi coprifili</strong> — la porta non prevede coprifili</span>
  </label>
  <div id="cfg-coprifili-wrap" style="display:\${escl?'none':'block'}">\`;

  if(!set){
    html+=\`<div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 12px;font-size:12px;color:var(--amber-tx);margin-bottom:12px">
      Nessun set definito in archivio per l'apertura <strong>\${CFG.apertura||''}</strong>. Puoi comunque impostare larghezza e aste qui; per renderlo automatico definiscilo in Archivio → Telaio e componenti → Set coprifili.
    </div>\`;
  }

  html+=\`<div style="background:var(--beige);border-radius:var(--radius);padding:14px;border:0.5px solid var(--border);margin-bottom:12px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      <div>
        <div style="font-size:11px;color:var(--mid);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px">Larghezza profilo</div>
        <select onchange="setLarghezzaCoprifilo(this.value)" style="width:100%;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:inherit">\${largOpts}</select>
      </div>
      <div>
        <div style="font-size:11px;color:var(--mid);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px">Numero aste</div>
        <input type="number" value="\${aste}" min="0" step="0.5" onchange="setAsteCoprifilo(this.value)" style="width:100%;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:inherit">
        <div style="font-size:10px;color:var(--mid);margin-top:3px">standard 5 (2,5 + 2,5 per lato)</div>
      </div>
    </div>
    <div style="margin-top:12px;padding-top:12px;border-top:0.5px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:12px;color:var(--mid)">Colore: <strong style="color:var(--dark)">\${colore}</strong> <span style="font-size:11px">(segue il telaio)</span></div>
      <div style="font-size:12px">\${suppSet>0?'<span style="color:var(--red);font-weight:500">+ € '+suppSet.toLocaleString('it-IT',{minimumFractionDigits:2})+'</span>':'<span style="color:var(--green-tx)">compreso nel prezzo</span>'}</div>
    </div>
  </div>
  <div style="font-size:11px;color:var(--mid);margin-bottom:8px">Il codice articolo a magazzino (colore + lunghezza 2250/3000 secondo il sopraluce) viene risolto automaticamente in produzione/scarico.</div>\`;

  html+=\`</div>
  <div style="display:flex;justify-content:flex-end;margin-top:8px">
    <button class="btn btn-red btn-sm" onclick="renderCfgStep('ferramenta')">Avanti →</button>
  </div>\`;
  document.getElementById('cfg-body').innerHTML=html;
}

function ricalcolaPrezzoCoprifili(){
  if(CFG.escludi_coprifili){ CFG.p_coprifili=0; CFG.nome_coprifili='Esclusi'; cfgUpdatePrice&&cfgUpdatePrice(); return; }
  const suppSet = CFG._coprifili_set? (parseFloat(CFG._coprifili_set.supplemento)||0) : 0;
  CFG.p_coprifili = Math.round(suppSet*100)/100;
  const larg = CFG.coprifili_larghezza||65;
  const aste = CFG.coprifili_aste!=null?CFG.coprifili_aste:5;
  const colore = CFG.nome_finitura_telaio || CFG.nome_finitura || '';
  CFG.nome_coprifili = \`Coprifilo \${larg}mm × \${aste} aste\${colore?' · '+colore:''}\`;
  cfgUpdatePrice&&cfgUpdatePrice();
}

function toggleEscludiCoprifili(checked){
  CFG.escludi_coprifili = !!checked;
  const wrap=document.getElementById('cfg-coprifili-wrap');
  if(wrap) wrap.style.display = checked?'none':'block';
  ricalcolaPrezzoCoprifili();
}

function setLarghezzaCoprifilo(val){
  CFG.coprifili_larghezza = parseInt(val)||65;
  ricalcolaPrezzoCoprifili();
}
function setAsteCoprifilo(val){
  CFG.coprifili_aste = parseFloat(val)||0;
  ricalcolaPrezzoCoprifili();
}

async function cfgSerratura(){
  const fam = CFG.apertura||'';
  const {data:defaults} = await sb.from('apertura_serrature').select('codice_serratura,is_default').eq('codice_apertura',fam);
  const defaultSerr = (defaults||[]).find(d=>d.is_default)?.codice_serratura;
  const {data:tutte} = await sb.from('tipi_serratura').select('*').eq('attiva',true).eq('is_automatica',false);
  const famUpper = fam.toUpperCase().trim();
  // Mappa l'apertura alla sua famiglia generica
  const getFamiglia = (a) => {
    if(!a) return 'BAT';
    if(a==='SI'||a.startsWith('SI/')||a.startsWith('SI ')||a==='SE'||a.startsWith('SE/')||a.startsWith('SE ')||a.startsWith('S/')) return 'SCORREVOLE';
    if(a==='LIBRO'||a.startsWith('LIBRO/')||a.startsWith('LIBRO ')) return 'LIBRO';
    if(a.startsWith('CS')) return 'CS';
    if(a.startsWith('COM')) return 'COM';
    if(a.startsWith('FM')) return 'FM';
    if(a.startsWith('ROTO')) return 'ROTO';
    return 'BAT';
  };
  const famigliaCorrente = getFamiglia(famUpper);
  // Filtro famiglie_apertura: se vuoto → visibile per tutti; se compilato → matcha codice esatto, prefisso o famiglia
  const serratureFam = (tutte||[]).filter(s=>{
    if(!s.famiglie_apertura) return true;
    const fams = s.famiglie_apertura.split(',').map(x=>x.trim().toUpperCase()).filter(Boolean);
    return fams.some(f =>
      famUpper === f ||                          // codice esatto: "LIBRO Q" === "LIBRO Q"
      famUpper.startsWith(f+'/') ||             // variante slash: "LIBRO/S"
      famUpper.startsWith(f+' ') ||             // variante spazio: "LIBRO Q"
      famigliaCorrente === f                    // famiglia generica: "LIBRO" per tutte le varianti libro
    );
  });
  // Poi applica le regole della tab compatibilità (esclusioni specifiche)
  const serrature = await filtraPerCompatibilita(serratureFam, 'serratura', 'codice');
  if(!CFG.serratura&&defaultSerr){
    const def=serrature.find(s=>s.codice===defaultSerr);
    if(def){CFG.serratura=def.codice;CFG.nome_serratura=def.nome;}
  }
  const cards=serrature.map(s=>{
    const sp=s[\`sovrapprezzo_\${listino().toLowerCase()}\`]||0;
    const sel=CFG.serratura===s.codice;
    const isDefault=s.codice===defaultSerr;
    const tags=[];
    if(s.richiede_cilindro) tags.push('<span style="font-size:10px;background:var(--blue-bg);color:var(--blue-tx);padding:1px 5px;border-radius:3px">+ cilindro</span>');
    if(s.richiede_pomolino) tags.push('<span style="font-size:10px;background:var(--amber-bg);color:var(--amber-tx);padding:1px 5px;border-radius:3px">+ pomolino</span>');
    if(isDefault) tags.push('<span style="font-size:10px;background:var(--green-bg);color:var(--green-tx);padding:1px 5px;border-radius:3px">★ standard</span>');
    return \`<div onclick="selSerratura('\${s.codice}','\${s.nome.replace(/'/g,"\\'")}',\${sp},\${s.richiede_cilindro},\${s.richiede_pomolino})"
      style="border:\${sel?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px 12px;cursor:pointer;background:\${sel?'var(--red-bg)':'var(--white)'}">
      <div style="font-size:13px;font-weight:500;color:\${sel?'var(--red)':'var(--dark)'};margin-bottom:4px">\${s.nome}</div>
      <div style="font-size:11px;color:var(--mid);margin-bottom:4px">\${s.descrizione||''}</div>
      <div style="display:flex;gap:4px;flex-wrap:wrap">\${tags.join('')}</div>
      <div style="font-size:11px;color:var(--mid);margin-top:4px">\${sp>0?'+€'+sp:'Inclusa'}</div>
    </div>\`;
  }).join('');
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Serratura <span style="color:var(--mid);font-weight:400">— \${CFG.nome_apertura||''} \${CFG.senso||''}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('apertura')">← Indietro</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
      \${cards||'<p style="color:var(--mid);font-size:12px;grid-column:1/-1">Nessuna serratura configurata</p>'}
    </div>\`;
}
async function selSerratura(cod,nome,sovr,richiede_cilindro,richiede_pomolino){
  CFG.serratura=cod;CFG.nome_serratura=nome;CFG.p_serratura=sovr||0;
  CFG._richiede_cilindro=richiede_cilindro;CFG._richiede_pomolino=richiede_pomolino;
  cfgUpdatePrice();
  await renderCfgStep(richiede_cilindro?'cilindro':'misure');
}

async function cfgCilindro(){
  const fam=CFG.apertura||'';
  const {data:tutti}=await sb.from('tipi_cilindro').select('*').eq('attivo',true).order('misura_mm');
  const cilindri=(tutti||[]).filter(c=>{
    if(!c.famiglie_apertura) return true;
    return c.famiglie_apertura.split(',').map(x=>x.trim()).some(f=>fam.startsWith(f));
  });
  const cards=cilindri.map(c=>{
    const sp=c[\`sovrapprezzo_\${listino().toLowerCase()}\`]||0;
    const sel=CFG.cilindro===c.codice;
    return \`<div onclick="selCilindro('\${c.codice}','\${c.nome.replace(/'/g,"\\'")}',\${sp})"
      style="border:\${sel?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px 12px;cursor:pointer;background:\${sel?'var(--red-bg)':'var(--white)'}">
      <div style="font-size:13px;font-weight:500;color:\${sel?'var(--red)':'var(--dark)'}">\${c.nome}</div>
      \${c.misura_mm?\`<div style="font-size:11px;color:var(--mid)">\${c.misura_mm}mm</div>\`:''}
      \${c.fornitore?\`<div style="font-size:11px;color:var(--mid)">\${c.fornitore}</div>\`:''}
      <div style="font-size:11px;color:var(--mid);margin-top:4px">\${sp>0?'+€'+sp:'Incluso'}</div>
    </div>\`;
  }).join('');
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Cilindro <span style="color:var(--mid);font-weight:400">— \${CFG.nome_serratura||''}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('serratura')">← Indietro</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
      \${cards||'<p style="color:var(--mid);font-size:12px;grid-column:1/-1">Nessun cilindro disponibile</p>'}
    </div>\`;
}

function selCilindro(cod,nome,sovr){
  CFG.cilindro=cod;CFG.nome_cilindro=nome;CFG.p_cilindro=sovr||0;
  cfgUpdatePrice();renderCfgStep('misure');
}

async function cfgFerramenta(){
  const {data:tuttaFerr}=await sb.from('ferramenta').select('*').eq('attivo',true).order('nome');
  const ferr=await filtraPerCompatibilita(tuttaFerr||[],'ferramenta','codice');
  const rowsFerr=(ferr||[]).map(f=>{
    const sp=f[\`sovrapprezzo_\${listino().toLowerCase()}\`]||0;
    const hex=f.colore_hex||'CCCCCC';
    return \`<div onclick="selFerramenta('\${f.codice}','\${f.nome}',\${sp})"
      style="border:\${CFG.ferramenta===f.codice?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:8px 10px;cursor:pointer;background:\${CFG.ferramenta===f.codice?'var(--red-bg)':'var(--white)'};display:flex;align-items:center;gap:8px">
      <div style="width:22px;height:22px;border-radius:50%;background:#\${hex};border:0.5px solid rgba(0,0,0,0.15);flex-shrink:0"></div>
      <div>
        <div style="font-size:12px;font-weight:500;color:\${CFG.ferramenta===f.codice?'var(--red)':'var(--dark)'}">\${f.nome}</div>
        <div style="font-size:10px;color:var(--mid)">\${sp>0?'+€'+sp:'Inclusa'}</div>
      </div>
    </div>\`;
  }).join('');
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Colore ferramenta</div>
      <button class="btn btn-sm" onclick="renderCfgStep('spessore')">← Indietro</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:16px">\${rowsFerr||'<p style="color:var(--mid);font-size:12px">Nessuna ferramenta configurata</p>'}</div>
    <div style="display:flex;justify-content:flex-end">
      <button class="btn btn-red btn-sm" onclick="renderCfgStep('maniglia')" \${!CFG.ferramenta?'disabled':''}>Avanti →</button>
    </div>\`;
  cfgUpdatePrice();
}

function selFerramenta(cod,nome,sovr){CFG.ferramenta=cod;CFG.nome_ferramenta=nome;CFG.p_ferramenta=sovr;cfgUpdatePrice();renderCfgStep('maniglia');}

async function cfgManiglia(){
  const fam = (CFG.apertura||'').toUpperCase();
  const isScorrevole = fam==='SI'||fam==='SE'||fam.startsWith('SI')||fam.startsWith('SE')||fam.startsWith('S/');
  const isLibro = fam==='LIBRO'||fam.startsWith('LIBRO');
  const isBattente = !isScorrevole && !isLibro;

  // Carica maniglie
  const {data:tutteMan}=await sb.from('maniglie').select('*').eq('attivo',true).order('nome');
  // Filtra per aperture_escluse: scarta maniglie che escludono esplicitamente l'apertura corrente
  const aperturaCorrente = (CFG.apertura||'').toUpperCase().trim();
  const manCompatibili = (tutteMan||[]).filter(m=>{
    if(!m.aperture_escluse || m.codice==='NESSUNA') return true;
    const escluse = m.aperture_escluse.split(',').map(s=>s.trim().toUpperCase()).filter(Boolean);
    // Confronto per famiglia: "LIBRO" esclude "LIBRO", "LIBRO/S", "LIBRO Q", ecc.
    return !escluse.some(e => aperturaCorrente === e || aperturaCorrente.startsWith(e+'/') || aperturaCorrente.startsWith(e+' '));
  });
  const manAll=await filtraPerCompatibilita(manCompatibili,'maniglia','codice');

  // Versioni ammesse per tipo apertura
  // SCORREVOLE → versione=SCORREVOLE (+ NESSUNA)
  // LIBRO → versione=LIBRO (+ NESSUNA)
  // BATTENTE → versione=CHIAVE|CILINDRO|WC|MANIGLIONE in base a serratura (+ NESSUNA)
  let versioniAmmesse;
  if(isScorrevole){
    versioniAmmesse = new Set(['SCORREVOLE']);
  } else if(isLibro){
    versioniAmmesse = new Set(['LIBRO']);
  } else {
    // Battente/CS/COM ecc: filtra per serratura
    if(CFG._richiede_cilindro) versioniAmmesse = new Set(['CILINDRO']);
    else if(CFG.serratura==='L-O'||CFG.serratura==='WC'||CFG._richiede_pomolino) versioniAmmesse = new Set(['WC']);
    else versioniAmmesse = new Set(['CHIAVE']);
  }

  let man = manAll.filter(m=>{
    if(m.codice==='NESSUNA') return true;
    if(!m.versione) return isBattente; // senza versione = battente generico
    return versioniAmmesse.has(m.versione.toUpperCase());
  });

  // NESSUNA sempre prima
  const nessuna = man.filter(m=>m.codice==='NESSUNA');
  const resto = man.filter(m=>m.codice!=='NESSUNA');
  man = [...nessuna, ...resto];

  const rowsMan=man.map(m=>{
    const pr=m[\`prezzo_\${listino().toLowerCase()}\`]||0;
    const sel=CFG.maniglia===m.codice;
    const isNessuna=m.codice==='NESSUNA';
    return \`<div onclick="selManiglia('\${m.codice}','\${m.nome.replace(/'/g,"\\'")}',\${pr})"
      style="border:\${sel?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:8px 10px;cursor:pointer;background:\${sel?'var(--red-bg)':'var(--white)'}">
      \${isNessuna?'<div style="font-size:12px;font-weight:500;color:var(--mid)">⊘ Senza maniglia</div><div style="font-size:10px;color:var(--mid)">non fornita da Max Porte</div>':''}
      \${!isNessuna?\`<div style="font-size:12px;font-weight:500;color:\${sel?'var(--red)':'var(--dark)'}">\${m.nome}</div>\`:''}
      \${!isNessuna&&m.versione?\`<div style="font-size:10px;color:var(--mid)">\${m.versione}</div>\`:''}
      \${!isNessuna?\`<div style="font-size:11px;color:var(--mid);margin-top:2px">\${pr>0?'da €'+pr:'Inclusa'}</div>\`:''}
    </div>\`;
  }).join('');

  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Maniglia<span style="font-size:11px;color:var(--mid);font-weight:400"> — \${isScorrevole?'Scorrevole':isLibro?'Libro':'vers. '+[...versioniAmmesse].join('/')}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('ferramenta')">← Indietro</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">\${rowsMan||'<p style="color:var(--mid);font-size:12px;grid-column:1/-1">Nessuna maniglia disponibile</p>'}</div>\`;
}

async function selManiglia(cod,nome,pr){
  CFG.maniglia=cod;CFG.nome_maniglia=nome;CFG.p_maniglia=pr;
  CFG._maniglia_esclusa=(cod==='NESSUNA');
  cfgUpdatePrice();
  if(cod==='NESSUNA'){
    CFG.colore_maniglia=null;CFG.nome_colore_maniglia='';
    await renderCfgStep(CFG._richiede_pomolino?'pomolino':'riepilogo');
  } else {
    await renderCfgStep('colore_maniglia');
  }
}

async function cfgColoreManiglia(){
  const {data:colori}=await sb.from('colori_maniglia').select('*').eq('codice_maniglia',CFG.maniglia).eq('attivo',true).order('nome_colore');
  const cards=(colori||[]).map(c=>{
    const sel=CFG.colore_maniglia===c.codice_colore;
    const hex=c.colore_hex;
    return \`<div onclick="selColoreManiglia('\${c.codice_colore}','\${c.nome_colore.replace(/'/g,"\\'")}',\${c.prezzo_maniglia||0})"
      style="border:\${sel?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:8px 10px;cursor:pointer;background:\${sel?'var(--red-bg)':'var(--white)'}">
      \${hex?\`<div style="width:100%;height:18px;border-radius:4px;background:#\${hex};border:0.5px solid rgba(0,0,0,0.1);margin-bottom:4px"></div>\`:''}
      <div style="font-size:11px;font-weight:500;color:\${sel?'var(--red)':'var(--dark)'}">\${c.nome_colore}</div>
      <div style="font-size:10px;color:var(--mid)">\${c.prezzo_maniglia>0?'€'+c.prezzo_maniglia:'Incluso'}</div>
    </div>\`;
  }).join('');
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Colore maniglia <span style="color:var(--mid);font-weight:400">— \${CFG.nome_maniglia||''}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('maniglia')">← Indietro</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">\${cards||'<p style="color:var(--mid);font-size:12px;grid-column:1/-1">Nessun colore disponibile</p>'}</div>\`;
}

async function selColoreManiglia(cod,nome,prezzo){
  CFG.colore_maniglia=cod;CFG.nome_colore_maniglia=nome;CFG.p_maniglia=prezzo;
  cfgUpdatePrice();await cfgRiepilogo();
}

async function cfgPomolino(){
  const {data:pomolini}=await sb.from('pomolini_wc').select('*').eq('attivo',true);
  const cards=(pomolini||[]).map(p=>{
    const sel=CFG.pomolino===p.codice;
    return \`<div onclick="selPomolino('\${p.codice}','\${p.nome.replace(/'/g,"\\'")}',\${p[\`prezzo_\${listino().toLowerCase()}\`]||0})"
      style="border:\${sel?'2px solid var(--red)':'0.5px solid var(--border)'};border-radius:var(--radius);padding:10px 12px;cursor:pointer;background:\${sel?'var(--red-bg)':'var(--white)'}">
      <div style="font-size:13px;font-weight:500;color:\${sel?'var(--red)':'var(--dark)'}">\${p.nome}</div>
    </div>\`;
  }).join('');
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Pomolino WC <span style="color:var(--mid);font-weight:400;font-size:12px">— maniglia esclusa</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('maniglia')">← Indietro</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">\${cards||'<p style="color:var(--mid);font-size:12px">Nessun pomolino configurato</p>'}</div>\`;
}

function selPomolino(cod,nome,prezzo){
  CFG.pomolino=cod;CFG.nome_pomolino=nome;CFG.p_pomolino=prezzo;
  cfgUpdatePrice();cfgRiepilogo();
}

// ── CONFIGURATORE ACCESSORI ───────────────────────────

// Passata: layout identico a misure porte
async function cfgAccMisure(){
  const {data:misure} = await sb.from('misure_standard').select('*').eq('famiglia_apertura','PAS').order('larghezza_mm').order('altezza_mm');
  const lSel = CFG.larghezza||'';
  const aSel = CFG.altezza||'';

  const larghezze = [...new Set((misure||[]).map(m=>m.larghezza_mm))];
  const altezze   = [...new Set((misure||[]).map(m=>m.altezza_mm).filter(a=>a>0))];

  const pillL = larghezze.map(l=>\`<div onclick="selPillPas('l',\${l})" id="pas-l-\${l}"
    style="padding:6px 14px;border-radius:20px;border:\${l==lSel?'2px solid var(--red)':'0.5px solid var(--border)'};
    cursor:pointer;font-size:13px;font-weight:\${l==lSel?'600':'400'};
    background:\${l==lSel?'var(--red-bg)':'var(--white)'};color:\${l==lSel?'var(--red)':'var(--dark)'}">
    \${l}
  </div>\`).join('');

  const pillA = altezze.map(a=>\`<div onclick="selPillPas('a',\${a})" id="pas-a-\${a}"
    style="padding:6px 14px;border-radius:20px;border:\${a==aSel?'2px solid var(--red)':'0.5px solid var(--border)'};
    cursor:pointer;font-size:13px;font-weight:\${a==aSel?'600':'400'};
    background:\${a==aSel?'var(--red-bg)':'var(--white)'};color:\${a==aSel?'var(--red)':'var(--dark)'}">
    \${a}
  </div>\`).join('');

  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:13px;font-weight:500">Misure passata <span style="color:var(--mid);font-weight:400">— \${CFG.nome_modello}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('finitura')">← Indietro</button>
    </div>
    \${larghezze.length?\`
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:var(--mid);margin-bottom:8px">LARGHEZZA (MM)</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">\${pillL}</div>
    </div>\`:''}
    \${altezze.length?\`
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:var(--mid);margin-bottom:8px">ALTEZZA (MM)</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">\${pillA}</div>
    </div>\`:''}
    <div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--amber-tx);margin-bottom:12px">
      Misura non presente nell'elenco? Inseriscila manualmente — verrà marcata come <strong>misura custom</strong>.
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;align-items:end;margin-bottom:8px">
      <div>
        <label style="font-size:11px;color:var(--mid);display:block;margin-bottom:3px">Larghezza custom (mm)</label>
        <input type="number" id="acc-l" placeholder="es. 870" style="width:100%;padding:7px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px">
      </div>
      <div>
        <label style="font-size:11px;color:var(--mid);display:block;margin-bottom:3px">Altezza custom (mm)</label>
        <input type="number" id="acc-a" placeholder="es. 2100" style="width:100%;padding:7px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px">
      </div>
      <div></div>
    </div>
    <div style="display:flex;justify-content:flex-end">
      <button class="btn btn-red" onclick="selAccMisure()">Avanti →</button>
    </div>\`;
}

function selPillPas(dim, val){
  if(dim==='l'){
    CFG._pasL=val;
    document.querySelectorAll('[id^="pas-l-"]').forEach(el=>{
      const attivo = el.id==='pas-l-'+val;
      el.style.border=attivo?'2px solid var(--red)':'0.5px solid var(--border)';
      el.style.background=attivo?'var(--red-bg)':'var(--white)';
      el.style.color=attivo?'var(--red)':'var(--dark)';
      el.style.fontWeight=attivo?'600':'400';
    });
  } else {
    CFG._pasA=val;
    document.querySelectorAll('[id^="pas-a-"]').forEach(el=>{
      const attivo = el.id==='pas-a-'+val;
      el.style.border=attivo?'2px solid var(--red)':'0.5px solid var(--border)';
      el.style.background=attivo?'var(--red-bg)':'var(--white)';
      el.style.color=attivo?'var(--red)':'var(--dark)';
      el.style.fontWeight=attivo?'600':'400';
    });
  }
}

function selAccMisuraStd(l,a){
  CFG.larghezza=l; CFG.altezza=a; CFG.misura_custom=false;
  cfgUpdatePrice(); renderCfgStep('acc_spessore');
}

function selAccMisure(){
  // Priorità: input custom > pill selezionate
  const lCustom = parseInt(document.getElementById('acc-l')?.value||0);
  const aCustom = parseInt(document.getElementById('acc-a')?.value||0);
  const l = lCustom || CFG._pasL || 0;
  const a = aCustom || CFG._pasA || 0;
  if(!l||!a){toast('Seleziona o inserisci larghezza e altezza','err');return;}
  CFG.larghezza=l; CFG.altezza=a;
  CFG.misura_custom = !!(lCustom||aCustom);
  cfgUpdatePrice(); renderCfgStep('acc_spessore');
}

// Sopraluce: pill larghezza + input libero + calcolo altezza
async function cfgAccSopraluce(){
  const {data:misure} = await sb.from('misure_standard').select('*').eq('famiglia_apertura','SOP').order('larghezza_mm');
  const larghezze = [...new Set((misure||[]).map(m=>m.larghezza_mm))];
  const lSel = CFG.larghezza||'';

  const pillL = larghezze.map(l=>\`<div onclick="selPillSop(\${l})" id="sop-l-\${l}"
    style="padding:6px 14px;border-radius:20px;border:\${l==lSel?'2px solid var(--red)':'0.5px solid var(--border)'};
    cursor:pointer;font-size:13px;font-weight:\${l==lSel?'600':'400'};
    background:\${l==lSel?'var(--red-bg)':'var(--white)'};color:\${l==lSel?'var(--red)':'var(--dark)'}">
    \${l}
  </div>\`).join('');

  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:13px;font-weight:500">Misure sopraluce <span style="color:var(--mid);font-weight:400">— \${CFG.nome_modello}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('finitura')">← Indietro</button>
    </div>
    \${larghezze.length?\`
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:var(--mid);margin-bottom:8px">LARGHEZZA (MM)</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">\${pillL}</div>
    </div>\`:''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div>
        <label style="font-size:11px;color:var(--mid);display:block;margin-bottom:3px">Larghezza custom (mm)</label>
        <input type="number" id="sop-l-custom" value="\${!larghezze.includes(lSel)?lSel:''}" placeholder="es. 870"
          style="width:100%;padding:7px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px"
          oninput="selPillSop(null)">
      </div>
      <div></div>
    </div>
    <div style="background:var(--beige2);border-radius:var(--radius);padding:12px;font-size:12px;color:var(--mid);margin-bottom:12px">
      <strong style="color:var(--dark);display:block;margin-bottom:6px">Calcolo altezza sopraluce</strong>
      L'altezza viene calcolata sottraendo l'altezza della porta dall'altezza del foro muro.
    </div>
    <div style="margin-bottom:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:var(--mid);margin-bottom:8px">TIPOLOGIA PORTA SOTTO</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        \${[['BAT','Battente'],['CS','Senza battura'],['PAS','Passata']].map(([cod,label])=>\`
          <div onclick="selFamTelaioSop('\${cod}')" id="sop-fam-\${cod}"
            style="padding:6px 14px;border-radius:20px;border:\${(CFG._sopFamTelaio||'BAT')===cod?'2px solid var(--red)':'0.5px solid var(--border)'};
            cursor:pointer;font-size:13px;font-weight:\${(CFG._sopFamTelaio||'BAT')===cod?'600':'400'};
            background:\${(CFG._sopFamTelaio||'BAT')===cod?'var(--red-bg)':'var(--white)'};
            color:\${(CFG._sopFamTelaio||'BAT')===cod?'var(--red)':'var(--dark)'}">\${label}</div>
        \`).join('')}
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;align-items:end;margin-bottom:8px">
      <div>
        <label style="font-size:11px;color:var(--mid);display:block;margin-bottom:3px">Altezza foro muro (mm)</label>
        <input type="number" id="sop-foro" value="\${CFG._sopForo||''}" placeholder="es. 2400"
          oninput="calcAltezzaSopraluce()"
          style="width:100%;padding:7px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px">
      </div>
      <div>
        <label style="font-size:11px;color:var(--mid);display:block;margin-bottom:3px">Altezza luce porta (mm)</label>
        <input type="number" id="sop-porta" value="\${CFG._sopPorta||''}" placeholder="es. 2100"
          oninput="calcAltezzaSopraluce()"
          style="width:100%;padding:7px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px">
      </div>
      <div>
        <label style="font-size:11px;color:var(--mid);display:block;margin-bottom:3px">Altezza sopraluce calcolata</label>
        <div id="sop-result" style="padding:7px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:15px;font-weight:600;color:var(--red);background:var(--beige2)">
          \${CFG.altezza?CFG.altezza+' mm':'—'}
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:flex-end">
      <button class="btn btn-red" onclick="selAccSopraluce()">Avanti →</button>
    </div>\`;
}

function selFamTelaioSop(cod){
  CFG._sopFamTelaio = cod;
  ['BAT','CS','PAS'].forEach(c=>{
    const el = document.getElementById('sop-fam-'+c);
    if(!el) return;
    const attivo = c===cod;
    el.style.border = attivo?'2px solid var(--red)':'0.5px solid var(--border)';
    el.style.background = attivo?'var(--red-bg)':'var(--white)';
    el.style.color = attivo?'var(--red)':'var(--dark)';
    el.style.fontWeight = attivo?'600':'400';
  });
  // Ricalcola spalla se c'è già uno spessore inserito
  const spEl = document.getElementById('acc-sp-val');
  if(spEl && spEl.value) calcolaTelaioAcc(spEl.value);
}

function selPillSop(val){
  if(val!==null){
    CFG._sopL=val;
    // Deseleziona input custom
    const inp = document.getElementById('sop-l-custom');
    if(inp) inp.value='';
  } else {
    CFG._sopL=null;
  }
  document.querySelectorAll('[id^="sop-l-"]').forEach(el=>{
    if(!el.id.includes('custom')){
      const attivo = val!==null && el.id==='sop-l-'+val;
      el.style.border=attivo?'2px solid var(--red)':'0.5px solid var(--border)';
      el.style.background=attivo?'var(--red-bg)':'var(--white)';
      el.style.color=attivo?'var(--red)':'var(--dark)';
      el.style.fontWeight=attivo?'600':'400';
    }
  });
}

function calcAltezzaSopraluce(){
  const foro = parseInt(document.getElementById('sop-foro')?.value||0);
  const porta = parseInt(document.getElementById('sop-porta')?.value||0);
  const el = document.getElementById('sop-result');
  if(foro && porta && foro>porta+120){
    const h = foro - porta - 120;
    el.textContent = h+' mm';
    el.style.color='var(--red)';
    CFG._sopCalcH = h;
  } else {
    el.textContent='—';
    el.style.color='var(--mid)';
    CFG._sopCalcH = null;
  }
}

function selAccSopraluce(){
  const lCustom = parseInt(document.getElementById('sop-l-custom')?.value||0);
  const l = lCustom || CFG._sopL || 0;
  const foro = parseInt(document.getElementById('sop-foro')?.value||0);
  const porta = parseInt(document.getElementById('sop-porta')?.value||0);
  if(!l){toast('Seleziona o inserisci la larghezza','err');return;}
  if(!foro||!porta){toast('Inserisci altezza foro e altezza porta','err');return;}
  if(foro<=porta+120){toast('Il foro muro deve essere almeno 120mm più alto della porta','err');return;}
  const h = foro - porta - 120;
  if(!CFG._sopFamTelaio) CFG._sopFamTelaio='BAT';
  CFG.larghezza=l; CFG.altezza=h;
  CFG._sopForo=foro; CFG._sopPorta=porta;
  CFG.misura_custom=!!lCustom;
  cfgUpdatePrice(); renderCfgStep('acc_spessore');
}

// Spessore muro per passate e sopraluce (con regole_telaio come porte)
async function cfgAccSpessore(){
  const stepIndietro = CFG._tipoAccessorio==='sopraluce' ? 'acc_sopraluce' : 'acc_misure';
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Spessore muro <span style="color:var(--mid);font-weight:400">— \${CFG.larghezza}×\${CFG.altezza} mm</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('\${stepIndietro}')">← Indietro</button>
    </div>
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Spessore muro (mm)</div>
      <div style="display:flex;align-items:center;gap:10px">
        <input type="number" id="acc-sp-val" value="\${CFG.spessore||''}" placeholder="es. 200" step="1" min="1"
          style="width:120px;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:inherit"
          oninput="calcolaTelaioAcc(this.value)">
        <span style="font-size:13px;color:var(--mid)">mm</span>
      </div>
    </div>
    <div id="acc-telaio-result" style="margin-bottom:14px"></div>
    <div style="display:flex;gap:8px;justify-content:flex-end">
      <button class="btn btn-sm" onclick="selAccSpessore(true)">Salta →</button>
      <button class="btn btn-red btn-sm" onclick="selAccSpessore(false)">Avanti →</button>
    </div>\`;
  if(CFG.spessore) calcolaTelaioAcc(CFG.spessore);
}

async function calcolaTelaioAcc(spessore){
  const sp = parseFloat(spessore);
  if(!sp||sp<1){ document.getElementById('acc-telaio-result').innerHTML=''; return; }
  CFG.spessore=sp;

  // Per le passate usa famiglia PAS, per i sopraluce dipende dalla porta sotto (gestito dopo)
  const fam = CFG._tipoAccessorio==='sopraluce' ? (CFG._sopFamTelaio||'BAT') : 'PAS';

  const {data:regole} = await sb.from('regole_telaio')
    .select('*').eq('famiglia_apertura', fam)
    .lte('spessore_da_cm', sp).gte('spessore_a_cm', sp);

  if(!regole||regole.length===0){
    document.getElementById('acc-telaio-result').innerHTML=\`<div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px;font-size:12px;color:var(--amber-tx)">Spessore fuori range — verrà registrato senza spalla.</div>\`;
    return;
  }
  const regola = regole[0];
  let {data:spalla}=await sb.from('telai_spalle').select('*').eq('codice',regola.codice_spalla).eq('famiglia_apertura',fam).maybeSingle();
  if(!spalla){const {data:sf}=await sb.from('telai_spalle').select('*').eq('codice',regola.codice_spalla).limit(1).maybeSingle();spalla=sf;}
  const prezzoSpalla = spalla?.[\`prezzo_\${listino().toLowerCase()}\`]||0;
  CFG.spalla=regola.codice_spalla;
  CFG.p_telaio=prezzoSpalla;
  cfgUpdatePrice();
  document.getElementById('acc-telaio-result').innerHTML=\`
    <div style="background:var(--beige);border-radius:var(--radius);padding:12px 14px;border:0.5px solid var(--border)">
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;color:var(--mid);text-transform:uppercase;letter-spacing:0.4px">Telaio abbinato automaticamente</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><div style="font-size:14px;font-weight:500">Spalla \${regola.codice_spalla} — \${spalla?.spalla_cm||'?'} mm</div></div>
        <div style="font-size:14px;font-weight:500;color:var(--red)">\${prezzoSpalla?'€ '+prezzoSpalla:'Prezzo da definire'}</div>
      </div>
    </div>\`;
}

function selAccSpessore(salta){
  if(!salta){
    const sp = parseFloat(document.getElementById('acc-sp-val')?.value||0);
    if(!sp){toast('Inserisci lo spessore muro','err');return;}
    CFG.spessore=sp;
  } else {
    CFG.spessore=null; CFG.spalla=null; CFG.p_telaio=0;
  }
  cfgUpdatePrice(); cfgRiepilogo();
}

// Accessori semplici / coprifili: solo quantità
async function cfgAccQta(){
  const qMin = CFG._qtaMin||1;
  const qStep = CFG._qtaStep||1;
  const qta = CFG.quantita||qMin;
  const ammezzi = qStep<1;
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Quantità <span style="color:var(--mid);font-weight:400">— \${CFG.nome_modello}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('finitura')">← Indietro</button>
    </div>
    <div style="display:grid;gap:14px;max-width:280px">
      \${qMin>1?\`<div style="background:var(--beige2);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--mid)">Quantità minima: <strong style="color:var(--dark)">\${qMin} pz</strong></div>\`:''}
      <div>
        <label style="font-size:12px;color:var(--mid);display:block;margin-bottom:4px">Quantità (minimo \${qMin} pz\${ammezzi?', anche mezze':''})</label>
        <input type="number" id="acc-qta" value="\${qta}" min="\${qMin}" step="\${qStep}"
          style="width:100%;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:18px;font-weight:600;text-align:center">
      </div>
      <button class="btn btn-red" onclick="selAccQta()">Avanti →</button>
    </div>\`;
}

function selAccQta(){
  const q = parseFloat(document.getElementById('acc-qta')?.value||0);
  const qMin = CFG._qtaMin||1;
  const qStep = CFG._qtaStep||1;
  if(!q||q<qMin){toast(\`Quantità minima: \${qMin} pz\`,'err');return;}
  if(qStep>=1 && q!==Math.floor(q)){toast('Inserisci un numero intero','err');return;}
  if(qStep<1 && Math.round(q*2)!==q*2){toast('Sono ammesse solo quantità intere o mezze (es. 1,5)','err');return;}
  CFG.quantita=q;
  cfgUpdatePrice(); cfgRiepilogo();
}

// Pannello blindato: senso apertura + misure + intero/taglio a misura
async function cfgAccPannello(){
  const {data:imp}=await sb.from(\'impostazioni\').select(\'valore\').eq(\'chiave\',\'supplemento_taglio_pannello\').maybeSingle();
  CFG._suppTaglioPannello=parseFloat(imp?.valore||0);
  const {data:magP}=await sb.from(\'magazzino\')
    .select(\'altezza_mm,larghezza_mm,spessore_mm,giacenza\')
    .eq(\'categoria\',\'PAN-BL\').eq(\'codice_finitura\',CFG.finitura||\'\').order(\'altezza_mm\',{ascending:false});
  CFG._panMag=magP?.[0]||null;
  const hMag=CFG._panMag?.altezza_mm||0;
  const lMax=CFG._panMag?.larghezza_mm||0;
  const sensi=[\'Interno DX\',\'Esterno DX\',\'Interno SX\',\'Esterno SX\',\'Nessuno\'];
  const sensoSel=CFG.senso||\'\' ;
  var infoMag=CFG._panMag
    ?\'<div style="background:var(--beige);border-radius:var(--radius);padding:10px 14px;font-size:12px;margin-bottom:14px;border:0.5px solid var(--border)">\'+
      \'<strong>Pannello a magazzino:</strong> \'+hMag+\' x \'+lMax+\' mm\'+
      (CFG._panMag.giacenza!=null?\' &mdash; Giacenza: <strong>\'+CFG._panMag.giacenza+\' pz</strong>\':\'\')+\'</div>\'
    :\'<div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 14px;font-size:12px;margin-bottom:14px;color:var(--amber-tx)">\'+
      \'Nessun pannello per la finitura <strong>\'+( CFG.finitura||\'\' )+\'</strong>.</div>\';
  var sensiHtml=sensi.map(function(s){
    var att=s===sensoSel;
    return \'<div onclick="selSensoPannello(\\\'\'+ s +\'\\\')" id="senso-\'+s.replace(/ /g,\'-\')+\'"\'+
      \' style="padding:8px;border-radius:var(--radius);border:\'+( att?\'2px solid var(--red)\':\'0.5px solid var(--border)\')+\';\'+ 
      \'cursor:pointer;text-align:center;font-size:12px;background:\'+( att?\'var(--red-bg)\':\'var(--white)\')+\';color:\'+( att?\'var(--red)\':\'var(--dark)\')+\'">\'+ s +\'</div>\';
  }).join(\'\');
  document.getElementById(\'cfg-body\').innerHTML=
    \'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">\'+
    \'<div style="font-size:13px;font-weight:500">Configurazione pannello <span style="color:var(--mid);font-weight:400">&mdash; \'+CFG.nome_modello+\'</span></div>\'+
    \'<button class="btn btn-sm" onclick="renderCfgStep(&apos;finitura&apos;)">&larr; Indietro</button>\'+
    \'</div>\'+infoMag+
    \'<div style="display:grid;gap:14px;max-width:440px">\'+
    \'<div><label style="font-size:12px;color:var(--mid);display:block;margin-bottom:6px">Senso apertura</label>\'+
    \'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px" id="sensi-grid">\'+sensiHtml+\'</div>\'+
    \'<input type="hidden" id="pannello-senso" value="\'+sensoSel+\'"></div>\'+
    \'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">\'+
    \'<div><label style="font-size:12px;color:var(--mid);display:block;margin-bottom:4px">Larghezza (mm)\'+( lMax?\' &mdash; max \'+lMax+\' mm\':\'\')+\'</label>\'+
    \'<input type="number" id="pan-l" value="\'+( CFG.larghezza||\'\' )+\'" placeholder="es. 900"\'+
    \' style="width:100%;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px"\'+
    \' oninput="checkLarghezzaPan(this.value)"></div>\'+
    \'<div><label style="font-size:12px;color:var(--mid);display:block;margin-bottom:4px">Altezza richiesta (mm)</label>\'+
    \'<input type="number" id="pan-a" value="\'+( CFG.altezza||\'\' )+\'" placeholder="es. 2200"\'+
    \' style="width:100%;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px"\'+
    \' oninput="aggiornaZoccoliPreview(this.value)"></div></div>\'+
    \'<div id="zoccoli-preview"></div>\'+
    \'<button class="btn btn-red" onclick="selAccPannello()">Avanti &rarr;</button></div>\';
  if(CFG.altezza) aggiornaZoccoliPreview(CFG.altezza);
}

function checkLarghezzaPan(val){
  const lMax=CFG._panMag?.larghezza_mm||0;
  const warn=document.getElementById(\'pan-l-warn\');
  if(warn) warn.style.display=(lMax>0&&parseFloat(val)>lMax)?\'block\':\'none\';
}

function aggiornaZoccoliPreview(hStr){
  const el=document.getElementById(\'zoccoli-preview\');
  if(!el) return;
  const h=parseFloat(hStr||0);
  const hMag=CFG._panMag?.altezza_mm||0;
  if(!h){el.innerHTML=\'\';return;}
  if(!hMag){
    el.innerHTML=\'<div style="font-size:12px;color:var(--mid)">Altezza registrata senza calcolo zoccoli.</div>\';
    return;
  }
  if(h<=hMag){
    el.innerHTML=\'<div style="background:var(--green-bg);border-radius:var(--radius);padding:10px 12px;font-size:12px;color:var(--green-tx)">\'+
      \'&#10003; Taglio diretto: pannello H \'+hMag+\' mm &rarr; <strong>\'+h+\' mm</strong></div>\';
  } else {
    let z=0;
    while(hMag+z*80<h) z++;
    const hT=h-z*80;
    if(hT<=0){
      el.innerHTML=\'<div style="background:var(--red-bg);border-radius:var(--radius);padding:10px 12px;font-size:12px;color:var(--red)">Altezza non raggiungibile.</div>\';
    } else {
      el.innerHTML=\'<div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 12px;font-size:12px;color:var(--amber-tx)">\'+
        \'<strong>\'+z+\' zoccol\'+( z>1?\'i\':\'o\')+\'</strong> da 80 mm &mdash; \'+
        \'pannello tagliato a <strong>\'+hT+\' mm</strong> + \'+z+\' x 80 mm = \'+h+\' mm</div>\';
    }
  }
}

function selSensoPannello(s){
  document.getElementById('pannello-senso').value = s;
  document.querySelectorAll('#sensi-grid > div').forEach(el=>{
    const attivo = el.id === 'senso-'+s.replace(/ /g,'-');
    el.style.border = attivo?'2px solid var(--red)':'0.5px solid var(--border)';
    el.style.background = attivo?'var(--red-bg)':'var(--white)';
    el.style.color = attivo?'var(--red)':'var(--dark)';
  });
}

function selTipoPannello(tipo){
  CFG._pannelloTipo = tipo;
  ['intero','taglio'].forEach(t=>{
    const el = document.getElementById('tipo-'+t);
    if(!el) return;
    const sel = t===tipo;
    el.style.border = sel?'2px solid var(--red)':'0.5px solid var(--border)';
    el.style.background = sel?'var(--red-bg)':'var(--white)';
    const title = el.querySelector('div');
    if(title) title.style.color = sel?'var(--red)':'var(--dark)';
  });
  const misureBox = document.getElementById('pannello-misure-box');
  if(misureBox) misureBox.style.display = tipo==='taglio'?'grid':'none';
}

async function selAccPannello(){
  const senso=document.getElementById(\'pannello-senso\')?.value;
  if(!senso){toast(\'Seleziona il senso di apertura\',\'err\');return;}
  const l=parseInt(document.getElementById(\'pan-l\')?.value||0);
  const a=parseInt(document.getElementById(\'pan-a\')?.value||0);
  if(!l||!a){toast(\'Inserisci larghezza e altezza\',\'err\');return;}
  const panMag=CFG._panMag;
  const hMag=panMag?.altezza_mm||0;
  const lMax=panMag?.larghezza_mm||0;
  if(lMax>0&&l>lMax){toast(\'Larghezza massima: \'+lMax+\' mm\',\'err\');return;}
  CFG.senso=senso;CFG.larghezza=l;CFG.altezza=a;CFG.misura_custom=false;
  CFG.p_extra=CFG._suppTaglioPannello||0;
  CFG._zoccoliAuto=0;CFG._hTaglioPannello=a;CFG._hMagPannello=hMag;
  if(hMag>0&&a>hMag){
    let z=0; while(hMag+z*80<a) z++;
    const hT=a-z*80;
    if(hT<=0||hT>hMag){toast(\'Altezza non raggiungibile con i pannelli disponibili\',\'err\');return;}
    CFG._zoccoliAuto=z;CFG._hTaglioPannello=hT;
  }
  cfgUpdatePrice();cfgRiepilogo();
}

async function cfgRiepilogo(){
  const tot = cfgTotale();
  // Vincoli quantità da archivio (validi anche per accessori: unico campo quantità)
  const _qMin = CFG._qtaMin||1;
  const _qStep = CFG._qtaStep||1;
  const _qAmmezzi = _qStep<1;
  if(!CFG.quantita || CFG.quantita<_qMin) CFG.quantita=_qMin;
  // Calcola l'imballo per questa posizione (dipende da quantità e "posata da noi")
  await calcolaImballo();
  const _imbTot = CFG._imballo_totale||0;
  // Porte (non accessori/pannelli): mostra la spunta "posata da noi" se la serie ha un imballo-posa
  const _mostraPosa = !CFG._isAccessorio && !CFG._isPannelloBlindato && !!CFG._imballo_serie_posa;
  const desc = [
    CFG.nome_serie, CFG.nome_modello, CFG.nome_finitura,
    CFG.pannello_bugna?CFG.pannello_bugna:'',
    CFG.nome_colore_alu||'', CFG.nome_colore_pietra||'',
    CFG.nome_tipo_vetro||'',
    CFG.nome_apertura, CFG.senso,
    CFG.larghezza+'×'+CFG.altezza+' mm',
    'sp.'+CFG.spessore+' mm',
    CFG.nome_ferramenta||'',
    CFG.nome_maniglia||''
  ].filter(Boolean).join(' | ');

  // Calcola valori effettivi per riepilogo
  const p_fin_eff = (CFG._finitura_pct||0)>0 ? Math.round((CFG.p_base||0)*CFG._finitura_pct/100*100)/100 : (CFG.p_finitura||0);
  const sub_eff = (CFG.p_base||0)+p_fin_eff+(CFG.p_apertura||0)+(CFG.p_telaio||0);
  const p_misura_eff = (CFG._pct_misura||0)>0 ? Math.round(sub_eff*(CFG._pct_misura/100)*100)/100 : (CFG._p_misura||0);
  const p_fh_eff = CFG._isFuoriH ? (CFG._fuori_h_pct ? Math.round(sub_eff*CFG._fuori_h_pct/100*100)/100 : CFG._p_fuori_h||0) : 0;
  const p_fl_eff = CFG._isFuoriL ? Math.round((sub_eff+p_fh_eff)*CFG._fuori_l_pct/100*100)/100 : 0;
  const p_doppia_eff = CFG._isDoppiaAnta ? ((CFG.p_base||0)+p_fin_eff+(CFG.p_telaio||0)+(CFG.apertura==='CS2A'?124:0)) : 0;

  const righe_prezzo = [
    {label:'Prezzo base porta',val:CFG.p_base},
    CFG.p_vetro>0&&{label:'Vetro ('+CFG.nome_tipo_vetro+')',val:CFG.p_vetro},
    p_fin_eff>0&&{label:'Finitura ('+(CFG._finitura_pct>0?'+'+CFG._finitura_pct+'%':'')+CFG.nome_finitura+')',val:p_fin_eff},
    CFG.p_bugna>0&&{label:'Bugna',val:CFG.p_bugna},
    CFG.p_inserto>0&&{label:'Inserto '+(CFG.nome_colore_alu||CFG.nome_colore_pietra),val:CFG.p_inserto},
    CFG.p_apertura>0&&{label:'Supplemento apertura ('+CFG.nome_apertura+')',val:CFG.p_apertura},
    (p_misura_eff)>0&&{label:'Supplemento misura'+(CFG._pct_misura>0?\` (+\${CFG._pct_misura}%)\`:''),val:p_misura_eff},
    CFG.p_telaio>0&&{label:'Telaio / Spalla ('+CFG.spalla+')',val:CFG.p_telaio},
    CFG.p_acc_telaio>0&&{label:'Accessorio telaio ('+CFG.accessorio_telaio+')',val:CFG.p_acc_telaio},
    (CFG.p_coprifili||0)>0&&{label:'Supplemento coprifili',val:CFG.p_coprifili},
    p_doppia_eff>0&&{label:'Supplemento doppia anta'+(CFG.apertura==='CS2A'?' incl. €124':''),val:p_doppia_eff},
    p_fh_eff>0&&{label:'Supplemento fuori misura H'+(CFG._fuori_h_pct?\` (+\${CFG._fuori_h_pct}%)\`:''),val:p_fh_eff},
    p_fl_eff>0&&{label:'Supplemento fuori misura L (+'+CFG._fuori_l_pct+'%)',val:p_fl_eff},
    CFG._p_varsavia>0&&{label:'Staffe Varsavia (obbligatorie)',val:CFG._p_varsavia},
    CFG.p_ferramenta>0&&{label:'Ferramenta ('+CFG.nome_ferramenta+')',val:CFG.p_ferramenta},
    CFG.p_maniglia>0&&{label:'Maniglia ('+CFG.nome_maniglia+')',val:CFG.p_maniglia},
    CFG.p_serratura>0&&{label:'Serratura ('+CFG.nome_serratura+')',val:CFG.p_serratura},
    CFG.p_cilindro>0&&{label:'Cilindro ('+CFG.nome_cilindro+')',val:CFG.p_cilindro},
    CFG.p_pomolino>0&&{label:'Pomolino WC',val:CFG.p_pomolino},
    CFG.p_extra_incisioni>0&&{label:'Extra incisioni',val:CFG.p_extra_incisioni},
  ].filter(Boolean);

  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Riepilogo configurazione</div>
      <button class="btn btn-sm" onclick="renderCfgStep('\${CFG._isAccessorio?'finitura':(CFG._isPannelloBlindato?'acc_pannello':'ferramenta')}')">← Modifica</button>
    </div>
    \${CFG.misura_custom?\`<div style="background:var(--red-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--red-tx);margin-bottom:10px">⚠ Misura custom — questo ordine richiederà approvazione del responsabile tecnico</div>\`:''}
    <div style="background:var(--beige);border-radius:var(--radius);padding:12px;margin-bottom:12px;font-size:12px;color:var(--mid);line-height:1.6">\${desc}</div>
    <table style="width:100%;font-size:13px;margin-bottom:12px">
      \${righe_prezzo.map(r=>\`<tr><td style="padding:3px 0;color:var(--mid)">\${r.label}</td><td style="text-align:right;font-weight:500">€ \${(r.val||0).toLocaleString('it-IT',{minimumFractionDigits:2})}</td></tr>\`).join('')}
      <tr style="border-top:0.5px solid var(--border)"><td style="padding:8px 0;font-weight:500">Totale unitario</td><td style="text-align:right;font-size:16px;font-weight:500;color:var(--red)">€ \${tot.toLocaleString('it-IT',{minimumFractionDigits:2})}</td></tr>
      \${_imbTot>0?\`<tr><td style="padding:3px 0;color:var(--mid)">Imballo (\${CFG._imballo_desc})\${CFG._imballo_metodo==='a_scatola'?\` — \${Math.ceil((CFG.quantita||1)/Math.max(1,CFG._imballo_capienza||1))} scatola/e\`:''}</td><td style="text-align:right;font-weight:500">€ \${_imbTot.toLocaleString('it-IT',{minimumFractionDigits:2})}</td></tr>\`:''}
    </table>
    \${(CFG.finitura_telaio && CFG.finitura_telaio!==CFG.finitura)?\`<div style="font-size:11px;color:var(--mid);margin-bottom:4px">Colore telaio e coprifili: <strong>\${CFG.nome_finitura_telaio}</strong></div>\`:''}
    \${CFG.escludi_coprifili
      ? '<div style="font-size:11px;color:var(--mid);margin-bottom:12px">Coprifili: <strong>esclusi</strong></div>'
      : (CFG.coprifili_larghezza
          ? '<div style="font-size:11px;color:var(--mid);margin-bottom:12px">Coprifili: Coprifilo '+CFG.coprifili_larghezza+'mm × '+(CFG.coprifili_aste!=null?CFG.coprifili_aste:5)+' aste'+((CFG.nome_finitura_telaio||CFG.nome_finitura)?' · '+(CFG.nome_finitura_telaio||CFG.nome_finitura):'')+'</div>'
          : '')}
    \${_mostraPosa?\`<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:8px 12px;background:var(--beige);border-radius:var(--radius)">
      <input type="checkbox" id="cfg-posata" \${CFG.posata_da_noi?'checked':''} onchange="CFG.posata_da_noi=this.checked;cfgRiepilogo()">
      <label for="cfg-posata" style="font-size:12px;color:var(--dark);cursor:pointer">Porta <strong>posata da noi</strong> (cambia l'imballo)</label>
    </div>\`:''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div>
        <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Quantità</div>
        <input type="number" id="cfg-qty" value="\${CFG.quantita||_qMin}" min="\${_qMin}" step="\${_qStep}" style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="CFG.quantita=parseFloat(this.value)||_qMin;cfgUpdatePrice()" onchange="CFG.quantita=parseFloat(this.value)||_qMin;cfgRiepilogo()">
        \${(_qMin>1||_qAmmezzi)?\`<div style="font-size:10px;color:var(--mid);margin-top:3px">Min \${_qMin} pz\${_qAmmezzi?', anche mezze':''}</div>\`:''}
      </div>
      <div>
        <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Note riga</div>
        <input type="text" id="cfg-note-riga" value="\${CFG.note_riga||''}" placeholder="Note specifiche su questa porta..." style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="CFG.note_riga=this.value">
      </div>
    </div>
    <div style="margin-bottom:12px">
      <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Stanza <span style="font-weight:400;color:var(--mid)">(opzionale)</span></div>
      <input type="text" id="cfg-stanza" value="\${CFG.stanza||''}" placeholder="es. Ingresso, Camera da letto..." style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="CFG.stanza=this.value">
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-size:11px;color:var(--mid)">Totale riga\${_imbTot>0?' (incl. imballo)':''}</div>
        <div id="cfg-prezzo-totale" style="font-size:20px;font-weight:500;color:var(--red)">€ \${(tot*(CFG.quantita||1)+_imbTot).toLocaleString('it-IT',{minimumFractionDigits:2})}</div>
      </div>
      <button class="btn" onclick="anteprimaDistinta()">&#128196; Anteprima distinta</button>
      <button class="btn btn-red" onclick="aggiungiRigaAlDocumento()">\${CFG_EDIT_RIGA_ID?'💾 Salva modifiche':'+ Aggiungi al documento'}</button>
    </div>\`;
  cfgUpdatePrice();
}

async function aggiungiRigaAlDocumento(){
  const _qMin = CFG._qtaMin||1, _qStep = CFG._qtaStep||1;
  const _q = parseFloat(document.getElementById('cfg-qty')?.value||0);
  if(!_q || _q<_qMin){toast(\`Quantità minima: \${_qMin} pz\`,'err');return;}
  if(_qStep>=1 && _q!==Math.floor(_q)){toast('Inserisci un numero intero','err');return;}
  if(_qStep<1 && Math.round(_q*2)!==_q*2){toast('Sono ammesse solo quantità intere o mezze (es. 1,5)','err');return;}
  CFG.quantita = _q;
  CFG.note_riga = document.getElementById('cfg-note-riga')?.value||'';
  CFG.stanza = document.getElementById('cfg-stanza')?.value||'';
  const tot = cfgTotale();
  // Ricalcola l'imballo sulla quantità definitiva
  await calcolaImballo();
  const _imbTot = CFG._imballo_totale||0;
  const riga = {
    codice_serie:CFG.serie, codice_modello:CFG.modello, nome_modello:CFG.nome_modello,
    nome_serie:CFG.nome_serie,
    codice_finitura:CFG.finitura, nome_finitura:CFG.nome_finitura,
    codice_finitura_telaio:CFG.finitura_telaio||CFG.finitura,
    nome_finitura_telaio:CFG.nome_finitura_telaio||CFG.nome_finitura,
    pannello_bugna:CFG.pannello_bugna,
    codice_colore_alu:CFG.colore_alu, nome_colore_alu:CFG.nome_colore_alu,
    codice_colore_pietra:CFG.colore_pietra, nome_colore_pietra:CFG.nome_colore_pietra,
    codice_tipo_vetro:CFG.tipo_vetro, nome_tipo_vetro:CFG.nome_tipo_vetro,
    codice_apertura:CFG.apertura, nome_apertura:CFG.nome_apertura,
    senso_apertura:CFG.senso,
    larghezza_mm:CFG.larghezza, altezza_mm:CFG.altezza,
    misura_custom:CFG.misura_custom, spessore_muro_cm:CFG.spessore,
    spessore_mm:(CFG._panMag&&CFG._panMag.spessore_mm)||null,
    codice_spalla:CFG.spalla, tipo_accessorio_telaio:CFG.accessorio_telaio,
    codice_ferramenta:CFG.ferramenta, nome_ferramenta:CFG.nome_ferramenta,
    codice_maniglia:CFG.maniglia, nome_maniglia:CFG.nome_maniglia,
    codice_colore_maniglia:CFG.colore_maniglia, nome_colore_maniglia:CFG.nome_colore_maniglia||'',
    prezzo_base:CFG.p_base, prezzo_vetro:CFG.p_vetro,
    prezzo_finitura:CFG.p_finitura, prezzo_bugna:CFG.p_bugna,
    prezzo_inserto:CFG.p_inserto, prezzo_apertura:CFG.p_apertura,
    prezzo_telaio:CFG.p_telaio, prezzo_accessorio_telaio:CFG.p_acc_telaio,
    prezzo_ferramenta:CFG.p_ferramenta, prezzo_maniglia:CFG.p_maniglia,
    prezzo_extra_incisioni:CFG.p_extra_incisioni,
    prezzo_unitario:tot, quantita:CFG.quantita,
    prezzo_totale_riga:Math.round((tot*CFG.quantita+_imbTot)*100)/100,
    // imballo
    codice_imballo:CFG._imballo_codice||null,
    prezzo_imballo_unitario:CFG._imballo_prezzo_unit||0,
    prezzo_imballo_totale:_imbTot,
    posata_da_noi:!!CFG.posata_da_noi,
    escludi_telaio:!!CFG.escludi_telaio,
    escludi_coprifili:!!CFG.escludi_coprifili,
    // coprifili (snapshot: larghezza + aste + colore=finitura telaio; lunghezza allo scarico)
    coprifili_config: CFG.escludi_coprifili ? null : {
      larghezza: CFG.coprifili_larghezza||null,
      aste: CFG.coprifili_aste!=null?CFG.coprifili_aste:5,
      colore_codice: CFG.finitura_telaio || CFG.finitura || null,
      colore_nome: CFG.nome_finitura_telaio || CFG.nome_finitura || null
    },
    prezzo_coprifili: CFG.escludi_coprifili ? 0 : (CFG.p_coprifili||0),
    note_riga:CFG.note_riga,
    stanza:CFG.stanza||null
  };

  if(CFG_TARGET_ID && CFG_EDIT_RIGA_ID){
    // MODIFICA di una riga esistente: aggiorna, mantieni riga_numero
    const tabella = CFG_MODE==='preventivo'?'righe_preventivo':'righe_ordine';
    const {error:errUp} = await sb.from(tabella).update(riga).eq('id',CFG_EDIT_RIGA_ID);
    if(errUp){ toast('Errore aggiornamento: '+errUp.message,'err'); return; }
    await ricalcolaTotale(CFG_TARGET_ID, CFG_MODE);
    toast('Riga aggiornata','ok');
    CFG_EDIT_RIGA_ID=null; CFG_EDIT_RIGA_NUM=null;
    closeCfg();
    if(CFG_MODE==='preventivo') renderPreventivoDetail(CFG_TARGET_ID);
    else renderOrdineDetail(CFG_TARGET_ID);
    resetCFG();
    return;
  }

  if(CFG_TARGET_ID){
    // Salvataggio diretto su documento esistente
    const tabella = CFG_MODE==='preventivo'?'righe_preventivo':'righe_ordine';
    const fk = CFG_MODE==='preventivo'?'preventivo_id':'ordine_id';
    const {data:esistenti} = await sb.from(tabella).select('riga_numero').eq(fk,CFG_TARGET_ID).order('riga_numero',{ascending:false}).limit(1);
    const nextNum = (esistenti?.[0]?.riga_numero||0)+1;
    await sb.from(tabella).insert([{...riga,[fk]:CFG_TARGET_ID,riga_numero:nextNum}]);
    // Aggiungi righe ZOC automatiche se pannello con zoccoli
    if((CFG._zoccoliAuto||0)>0){
      const {data:zocMod} = await sb.from('modelli').select('*').eq('codice','ZOC').eq('codice_serie','ACC').maybeSingle();
      const lst = listino().toUpperCase();
      const {data:zocPrezzo} = await sb.from('prezzi_modello').select('prezzo_base').eq('codice_modello','ZOC').eq('listino',lst).maybeSingle();
      const pZoc = zocPrezzo?.prezzo_base||0;
      const zocAcc = zocMod;
      await sb.from(tabella).insert([{
        [fk]:CFG_TARGET_ID, riga_numero:nextNum+1,
        codice_serie:CFG.serie, nome_serie:CFG.nome_serie,
        codice_serie:'ACC', codice_modello:'ZOC', nome_modello:zocMod?.nome||'Zoccolo Altezza 80mm',
        codice_finitura:CFG.finitura, nome_finitura:CFG.nome_finitura,
        quantita:CFG._zoccoliAuto,
        prezzo_base:pZoc, prezzo_unitario:pZoc,
        prezzo_totale_riga:pZoc*CFG._zoccoliAuto,
        note_riga:'Zoccolo automatico (pannello H '+CFG._hMagPannello+' mm, H finita '+CFG.altezza+' mm)'
      }]);
    }
    // Aggiorna totale documento
    await ricalcolaTotale(CFG_TARGET_ID, CFG_MODE);
    toast('Porta aggiunta','ok');
    closeCfg();
    if(CFG_MODE==='preventivo') renderPreventivoDetail(CFG_TARGET_ID);
    else renderOrdineDetail(CFG_TARGET_ID);
  } else {
    // Accumulo locale (documento non ancora salvato)
    CFG_RIGHE.push(riga);
    if((CFG._zoccoliAuto||0)>0){
      CFG_RIGHE.push({
        codice_serie:CFG.serie, nome_serie:CFG.nome_serie,
        codice_serie:'ACC', codice_modello:'ZOC', nome_modello:zocMod?.nome||'Zoccolo Altezza 80mm',
        codice_finitura:CFG.finitura, nome_finitura:CFG.nome_finitura,
        quantita:CFG._zoccoliAuto,
        prezzo_base:0, prezzo_unitario:0, prezzo_totale_riga:0,
        note_riga:'Zoccolo automatico (pannello H '+CFG._hMagPannello+' mm, H finita '+CFG.altezza+' mm)'
      });
    }
    toast('Porta aggiunta — salva il documento per confermare','ok');
    closeCfg();
    renderNuovoDocBozza();
  }
  resetCFG();
}

// ── TRASPORTO (voce di testata) ────────────────────────────────────────
// Card nel dettaglio documento: zona (auto-proposta dalla provincia cliente),
// mezzo proprio/corriere, costo calcolato dallo scaglione (n° porte), modificabile.
async function renderTrasportoCard(mode, doc, righe){
  const {data:zone} = await sb.from('zone_trasporto').select('*').order('ordine');
  const nPorte = (righe||[]).filter(r=>r.codice_serie!=='ACC'&&r.codice_serie!=='PAN-BL').reduce((s,r)=>s+(parseFloat(r.quantita)||0),0);
  // Provincia per l'auto-zona: sede operativa se compilata, altrimenti sede legale
  const ana = doc.anagrafiche||{};
  const provConsegna = (ana.sede_op_provincia||'').toUpperCase().trim();
  const provLegale = (ana.provincia||'').toUpperCase().trim();
  const prov = provConsegna || provLegale;
  // Auto-proposta zona dalla provincia se non ancora scelta
  let zonaId = doc.zona_trasporto_id;
  let autoProposta = false;
  if(!zonaId && prov){
    const z = (zone||[]).find(z => (z.province||'').toUpperCase().split(',').map(x=>x.trim()).includes(prov));
    if(z){ zonaId = z.id; autoProposta = true; }
  }
  const mezzo = doc.trasporto_mezzo || 'proprio';
  const ritiro = (mezzo==='ritiro');
  const costo = parseFloat(doc.costo_trasporto)||0;
  const zoneOpts = '<option value="">— nessuna —</option>'+(zone||[]).map(z=>\`<option value="\${z.id}" \${String(z.id)===String(zonaId)?'selected':''}>\${z.nome}</option>\`).join('');
  const bloccato = (mode==='preventivo' && doc.stato==='confermato');
  const dis = bloccato || ritiro;  // ritiro cliente → campi trasporto spenti
  return \`<div class="card">
    <div class="card-title">Trasporto</div>
    <table style="font-size:13px;width:100%">
      <tr><td style="color:var(--mid);padding:4px 0;width:130px">Modalità</td>
        <td><label style="font-size:12px;margin-right:12px"><input type="radio" name="trasp-mezzo" value="proprio" \${mezzo==='proprio'?'checked':''} \${bloccato?'disabled':''} onchange="aggiornaTrasporto('\${mode}','\${doc.id}')"> Mezzo Max Porte</label>
        <label style="font-size:12px;margin-right:12px"><input type="radio" name="trasp-mezzo" value="corriere" \${mezzo==='corriere'?'checked':''} \${bloccato?'disabled':''} onchange="aggiornaTrasporto('\${mode}','\${doc.id}')"> Corriere</label>
        <label style="font-size:12px"><input type="radio" name="trasp-mezzo" value="ritiro" \${ritiro?'checked':''} \${bloccato?'disabled':''} onchange="aggiornaTrasporto('\${mode}','\${doc.id}')"> Ritiro cliente</label></td></tr>
      \${ritiro?'<tr><td></td><td style="font-size:11px;color:var(--mid);padding-bottom:4px">Ritiro a cura del cliente — nessun costo di trasporto.</td></tr>':\`
      <tr><td style="color:var(--mid);padding:4px 0">Zona</td>
        <td><select id="trasp-zona" \${dis?'disabled':''} onchange="aggiornaTrasporto('\${mode}','\${doc.id}')" style="width:100%;font-size:12px;padding:3px 6px;border:0.5px solid var(--border);border-radius:4px">\${zoneOpts}</select>
        \${autoProposta?'<div style="font-size:10px;color:var(--mid);margin-top:2px">Proposta dalla provincia '+prov+' — conferma o cambia</div>':''}</td></tr>
      <tr><td style="color:var(--mid);padding:4px 0">N° porte</td><td style="font-size:12px">\${nPorte}</td></tr>
      <tr><td style="color:var(--mid);padding:4px 0">Costo trasporto</td>
        <td><div style="display:flex;align-items:center;gap:6px">
          <input type="number" id="trasp-costo" step="0.01" value="\${costo||''}" placeholder="0.00" \${dis?'disabled':''} style="width:100px;font-size:13px;padding:3px 6px;border:0.5px solid var(--border);border-radius:4px" onchange="salvaCostoTrasporto('\${mode}','\${doc.id}',this.value)">
          <span style="font-size:12px;color:var(--mid)">€</span>
          \${dis?'':'<button class="btn btn-sm" onclick="ricalcolaTrasporto(\\''+mode+'\\',\\''+doc.id+'\\')">Ricalcola da listino</button>'}
        </div></td></tr>\`}
    </table>
    \${ritiro?'':'<div style="font-size:10px;color:var(--mid);margin-top:6px">Il costo è proposto dal listino (zona + n° porte + mezzo) ma puoi modificarlo a mano.</div>'}
  </div>\`;
}

// Cambia zona o mezzo → ricalcola il costo dal listino e salva
async function aggiornaTrasporto(mode, docId){
  const tabDoc = mode==='preventivo'?'preventivi':'ordini_vendita';
  const mezzo = document.querySelector('input[name="trasp-mezzo"]:checked')?.value || 'proprio';
  // Mantieni coerente anche l'etichetta testuale 'trasporto' del form documento
  const TRASP_LABEL = {proprio:'Max Porte', corriere:'Vettore', ritiro:'Cliente'};
  const trasportoLabel = TRASP_LABEL[mezzo] || 'Max Porte';
  if(mezzo==='ritiro'){
    // Ritiro cliente: nessun trasporto, costo azzerato, zona svuotata
    await sb.from(tabDoc).update({trasporto_mezzo:'ritiro', trasporto:'Cliente', zona_trasporto_id:null, costo_trasporto:0}).eq('id',docId);
    await ricalcolaTotale(docId, mode);
    toast('Ritiro cliente — trasporto azzerato','ok');
    if(mode==='preventivo') renderPreventivoDetail(docId); else renderOrdineDetail(docId);
    return;
  }
  const zonaId = document.getElementById('trasp-zona')?.value || null;
  const nPorte = await contaPorteDoc(docId, mode);
  const costo = await calcolaCostoTrasporto(zonaId, mezzo, nPorte);
  await sb.from(tabDoc).update({zona_trasporto_id:zonaId||null, trasporto_mezzo:mezzo, trasporto:trasportoLabel, costo_trasporto:costo}).eq('id',docId);
  await ricalcolaTotale(docId, mode);
  toast('Trasporto aggiornato','ok');
  if(mode==='preventivo') renderPreventivoDetail(docId); else renderOrdineDetail(docId);
}
// Ricalcola esplicitamente il costo dal listino (bottone)
async function ricalcolaTrasporto(mode, docId){ await aggiornaTrasporto(mode, docId); }
// Salva un costo trasporto inserito a mano
async function salvaCostoTrasporto(mode, docId, val){
  const tabDoc = mode==='preventivo'?'preventivi':'ordini_vendita';
  const costo = parseFloat(val)||0;
  await sb.from(tabDoc).update({costo_trasporto:costo}).eq('id',docId);
  await ricalcolaTotale(docId, mode);
  toast('Costo trasporto salvato','ok');
  if(mode==='preventivo') renderPreventivoDetail(docId); else renderOrdineDetail(docId);
}

async function ricalcolaTotale(docId, mode){
  const tabRighe = mode==='preventivo'?'righe_preventivo':'righe_ordine';
  const fk = mode==='preventivo'?'preventivo_id':'ordine_id';
  const tabDoc = mode==='preventivo'?'preventivi':'ordini_vendita';
  const {data:righe} = await sb.from(tabRighe).select('prezzo_totale_riga').eq(fk,docId);
  const totRighe = (righe||[]).reduce((s,r)=>s+(r.prezzo_totale_riga||0),0);
  // Costo trasporto (voce di testata) sommato al totale imponibile
  const {data:docCorr} = await sb.from(tabDoc).select('totale_arrotondato,costo_trasporto').eq('id',docId).single();
  const costoTrasp = parseFloat(docCorr&&docCorr.costo_trasporto)||0;
  const totImponibile = Math.round((totRighe + costoTrasp)*100)/100;
  // Le righe sono cambiate: se c'era un arrotondamento salvato va azzerato,
  // altrimenti resterebbe calcolato sul vecchio totale (rischio di sottostimare il prezzo).
  const avevaArr = docCorr && docCorr.totale_arrotondato != null;
  await sb.from(tabDoc).update({
    totale_imponibile:totImponibile,
    totale_arrotondato:null,
    arrotondamento_euro:null
  }).eq('id',docId);
  if(avevaArr){
    toast('Arrotondamento azzerato: il totale e cambiato, reimpostalo se necessario','err');
  }
}

// Conta le "porte" del documento per lo scaglione trasporto:
// somma delle quantità delle righe-porta (accessori serie ACC e pannelli PAN-BL esclusi).
async function contaPorteDoc(docId, mode){
  const tabRighe = mode==='preventivo'?'righe_preventivo':'righe_ordine';
  const fk = mode==='preventivo'?'preventivo_id':'ordine_id';
  const {data:righe} = await sb.from(tabRighe).select('codice_serie,quantita').eq(fk,docId);
  return (righe||[]).filter(r=>r.codice_serie!=='ACC' && r.codice_serie!=='PAN-BL')
    .reduce((s,r)=>s+(parseFloat(r.quantita)||0),0);
}

// Calcola il costo trasporto per zona + mezzo + numero porte (scaglione)
async function calcolaCostoTrasporto(zonaId, mezzo, nPorte){
  if(!zonaId) return 0;
  const {data:scal} = await sb.from('listino_trasporti').select('*').eq('zona_id',zonaId).order('min_porte');
  if(!scal || !scal.length) return 0;
  // Trova lo scaglione che contiene nPorte (max_porte null = illimitato)
  const s = scal.find(t => nPorte >= (t.min_porte||0) && (t.max_porte==null || nPorte <= t.max_porte))
         || scal[scal.length-1];
  const prezzo = mezzo==='corriere' ? (s.prezzo_corriere||0) : (s.prezzo_proprio||0);
  return Math.round((parseFloat(prezzo)||0)*100)/100;
}

// ══════════════════════════════════════════════════════
// PREVENTIVI
// ══════════════════════════════════════════════════════
async function renderPreventivi(){
  try {
    const {data,error} = await sb.from('preventivi')
      .select('*,anagrafiche(ragione_sociale),agenti(nome,cognome)')
      .order('created_at',{ascending:false});
    if(error) throw error;
    window._prevData = data||[];
    const stats={bozza:0,inviato:0,firmato:0,rifiutato:0,confermato:0,non_concluso:0};
    window._prevData.forEach(function(p){ if(stats[p.stato]!==undefined) stats[p.stato]++; });
    document.getElementById('main-content').innerHTML=
      '<div class="grid-4" style="margin-bottom:16px">'+
      '<div class="metric"><div class="metric-label">Bozze</div><div class="metric-value">'+stats.bozza+'</div></div>'+
      '<div class="metric"><div class="metric-label">Inviati</div><div class="metric-value">'+stats.inviato+'</div></div>'+
      '<div class="metric"><div class="metric-label">Firmati</div><div class="metric-value" style="color:var(--green-tx)">'+stats.firmato+'</div></div>'+
      '<div class="metric"><div class="metric-label">Confermati</div><div class="metric-value" style="color:var(--red)">'+stats.confermato+'</div></div>'+
      '</div>'+
      '<div class="card">'+
        '<div class="card-header">'+
          '<span class="card-title">Preventivi</span>'+
          '<div style="display:flex;gap:8px;align-items:center">'+
            '<input type="text" id="prev-cerca" placeholder="Cerca numero, cliente, riferimento... (piu parole = AND)" '+
              'style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:340px" '+
              'oninput="filtraPrev(this.value)">'+
            '<button class="btn btn-red btn-sm" onclick="nuovoPreventivo()">+ Nuovo preventivo</button>'+
          '</div>'+
        '</div>'+
        '<table>'+
          '<thead><tr><th>N°</th><th>Cliente</th><th>Rif. cliente</th><th>Agente</th><th>Data</th><th>Scadenza</th><th>Listino</th><th>Totale netto</th><th>Stato</th></tr></thead>'+
          '<tbody id="prev-tbody"></tbody>'+
        '</table>'+
      '</div>';
    filtraPrev('');
  } catch(e) {
    console.error('renderPreventivi error:',e);
    document.getElementById('main-content').innerHTML='<div class="card"><div style="padding:20px">'+
      '<p style="color:var(--red);margin-bottom:12px">Errore: '+e.message+'</p>'+
      '<button class="btn btn-red btn-sm" onclick="nuovoPreventivo()">+ Nuovo preventivo</button>'+
      '</div></div>';
  }
}

function filtraPrev(filtro){
  var termini=(filtro||'').toLowerCase().split(/[\s,;]+/).filter(Boolean);
  var data=window._prevData||[];
  var filtered=termini.length?data.filter(function(p){
    var h=[p.numero||'',p.anagrafiche&&p.anagrafiche.ragione_sociale||'',
           p.riferimento_cliente||'',p.agenti?p.agenti.nome+' '+p.agenti.cognome:''].join(' ').toLowerCase();
    return termini.every(function(t){return h.includes(t);});
  }):data;
  var tbody=document.getElementById('prev-tbody');
  if(!tbody)return;
  if(!filtered.length){
    tbody.innerHTML='<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--mid);font-style:italic">'+(termini.length?'Nessun risultato':'Nessun preventivo')+'</td></tr>';
    return;
  }
  tbody.innerHTML=filtered.map(function(p){
    return '<tr class="data-row" onclick="renderPreventivoDetail(this.dataset.id)" data-id="'+p.id+'">'+
      '<td><strong>'+(p.numero||'')+'</strong></td>'+
      '<td>'+(p.anagrafiche&&p.anagrafiche.ragione_sociale||'&#8212;')+'</td>'+
      '<td>'+(p.riferimento_cliente||'&#8212;')+'</td>'+
      '<td>'+(p.agenti?p.agenti.nome+' '+p.agenti.cognome:'&#8212;')+'</td>'+
      '<td>'+fmtData(p.data_creazione)+'</td>'+
      '<td>'+fmtData(p.data_scadenza)+'</td>'+
      '<td><span class="tag">'+(p.listino||'')+'</span></td>'+
      '<td>'+fmtEuro(p.totale_netto||p.totale_imponibile)+'</td>'+
      '<td>'+badgeStato(p.stato)+'</td>'+
      '</tr>';
  }).join('');
}

async function apriModificaPreventivo(id){
  const {data:prev}=await sb.from('preventivi').select('*').eq('id',id).single();
  if(!prev){toast('Preventivo non trovato','err');return;}
  if(prev.stato==='confermato'){toast('Preventivo confermato: non modificabile','err');return;}
  const [{data:clienti},{data:agenti}]=await Promise.all([
    sb.from('anagrafiche').select('*').order('ragione_sociale'),
    sb.from('agenti').select('*').eq('attivo',true).order('cognome'),
  ]);
  CFG_RIGHE=[];
  const modal=ensureModalInBody('modal-nuovo-doc');
  modal.dataset.mode='preventivo';
  modal.dataset.editId=id;
  document.getElementById('ndoc-title').textContent='Modifica preventivo';
  document.getElementById('ndoc-clienti').innerHTML='<option value="">Seleziona...</option>'+(clienti||[]).map(function(c){
    return '<option value="'+c.id+'"'+(c.id===prev.anagrafica_id?' selected':'')+
      ' data-listino="'+(c.listino||'A')+'" data-sa="'+(c.sconto_dedicato_A||0)+
      '" data-sp="'+(c.sconto_dedicato_P||0)+'" data-ind="'+(c.indirizzo||'')+
      '" data-cap="'+(c.cap||'')+'" data-cit="'+(c.citta||'')+'" data-prv="'+(c.provincia||'')+'">'+
      c.ragione_sociale+'</option>';
  }).join('');
  document.getElementById('ndoc-agenti').innerHTML='<option value="">Nessun agente</option>'+(agenti||[]).map(function(a){
    return '<option value="'+a.id+'"'+(a.id===prev.agente_id?' selected':'')+'>'+a.cognome+' '+a.nome+'</option>';
  }).join('');
  document.getElementById('ndoc-listino').value=prev.listino||'A';
  document.getElementById('ndoc-sconto1').value=prev.sconto1||0;
  var s2=document.getElementById('ndoc-sconto2');if(s2)s2.value=prev.sconto2||0;
  var tr=document.getElementById('ndoc-trasporto');if(tr)tr.value=prev.trasporto||'Max Porte';
  var re=document.getElementById('ndoc-resa');if(re)re.value=prev.resa||'Franco fabbrica';
  var rif=document.getElementById('ndoc-rif-cliente');if(rif)rif.value=prev.riferimento_cliente||'';
  document.getElementById('ndoc-ind').value=prev.indirizzo_destinazione||'';
  document.getElementById('ndoc-cap').value=prev.cap_destinazione||'';
  document.getElementById('ndoc-cit').value=prev.citta_destinazione||'';
  setProvinciaDest(prev.provincia_destinazione||'');
  var no=document.getElementById('ndoc-note');if(no)no.value=prev.note||'';
  const {data:righe}=await sb.from('righe_preventivo').select('*').eq('preventivo_id',id).order('riga_numero',{ascending:true});
  CFG_RIGHE=(righe||[]).map(function(r){return Object.assign({},r);});
  aggiornaTotaleNdoc();
  modal.classList.add('open');
}


async function nuovoPreventivo(){
  try {
    const [{data:clienti},{data:agenti}] = await Promise.all([
      sb.from('anagrafiche').select('*').order('ragione_sociale'),
      sb.from('agenti').select('*').eq('attivo',true).order('cognome'),
    ]);
    CFG_RIGHE=[];
    const modal = ensureModalInBody('modal-nuovo-doc');
    if(!modal){ toast('Errore: modal non trovato','err'); return; }
    modal.dataset.mode='preventivo';
    document.getElementById('ndoc-title').textContent='Nuovo preventivo';
    document.getElementById('ndoc-clienti').innerHTML='<option value="">Seleziona cliente...</option>'+(clienti||[]).map(c=>\`<option value="\${c.id}" data-listino="\${c.listino||'A'}" data-sa="\${c.sconto_dedicato_A||0}" data-sp="\${c.sconto_dedicato_P||0}" data-ind="\${c.indirizzo||''}" data-cap="\${c.cap||''}" data-cit="\${c.citta||''}" data-prv="\${c.provincia||''}">\${c.ragione_sociale}</option>\`).join('');
    document.getElementById('ndoc-agenti').innerHTML='<option value="">Nessun agente</option>'+(agenti||[]).map(a=>\`<option value="\${a.id}">\${a.cognome} \${a.nome}</option>\`).join('');
    document.getElementById('ndoc-righe-list').innerHTML='<div style="text-align:center;padding:20px;color:var(--mid);font-size:13px;font-style:italic">Nessuna porta aggiunta ancora — clicca "+ Aggiungi porta"</div>';
    setProvinciaDest('');
    document.getElementById('ndoc-totale').textContent='€ 0,00';
    modal.classList.add('open');
  } catch(e) {
    console.error('nuovoPreventivo error:', e);
    toast('Errore apertura preventivo: '+e.message,'err');
  }
}

async function ndocClienteChange(sel){
  const opt = sel.options[sel.selectedIndex];
  if(!opt.value) return;

  // Carica dati completi del cliente da Supabase
  const {data:cliente} = await sb.from('anagrafiche').select('*').eq('id',opt.value).single();
  if(!cliente) return;

  // Listino e sconti
  const listino = cliente.listino||'A';
  document.getElementById('ndoc-listino').value = listino;
  const sconto = listino==='A' ? (cliente.sconto_dedicato_A||0) : (cliente.sconto_dedicato_P||0);
  document.getElementById('ndoc-sconto1').value = sconto;

  // Indirizzo destinazione
  document.getElementById('ndoc-ind').value = cliente.indirizzo||'';
  document.getElementById('ndoc-cap').value = cliente.cap||'';
  document.getElementById('ndoc-cit').value = cliente.citta||'';
  setProvinciaDest(cliente.provincia||'');

  // Agente collegato al cliente
  if(cliente.agente_id){
    const agenteSel = document.getElementById('ndoc-agenti');
    if(agenteSel){
      // Seleziona l'agente se presente nella lista
      const opt = Array.from(agenteSel.options).find(o=>o.value===cliente.agente_id);
      if(opt) agenteSel.value = cliente.agente_id;
    }
  }

  // Feedback visivo — mostra tooltip con dati compilati
  const info = [];
  if(listino) info.push(\`Listino \${listino}\`);
  if(sconto>0) info.push(\`Sconto \${sconto}%\`);
  if(cliente.condizioni_pagamento) info.push(cliente.condizioni_pagamento);
  if(info.length>0) toast('Cliente: '+info.join(' · '),'ok');

  aggiornaTotaleNdoc();
}

function aggiornaTotaleNdoc(){
  const sc1=parseFloat(document.getElementById('ndoc-sconto1')?.value||0)/100;
  const sc2=parseFloat(document.getElementById('ndoc-sconto2')?.value||0)/100;
  const imponibile=CFG_RIGHE.reduce((s,r)=>s+(r.prezzo_totale_riga||0),0);
  const dopoSc1=imponibile*(1-sc1);
  const netto=dopoSc1*(1-sc2);
  const scTot=((1-(1-sc1)*(1-sc2))*100).toFixed(2);
  document.getElementById('ndoc-totale').textContent=fmtEuro(netto);
  // mostra dettaglio sconti se applicati
  const detEl=document.getElementById('ndoc-sconto-detail');
  if(detEl){
    if(sc1>0||sc2>0){
      detEl.innerHTML=\`<span style="font-size:11px;color:var(--mid)">Imponibile \${fmtEuro(imponibile)} → sconto effettivo \${scTot}%</span>\`;
    } else {
      detEl.innerHTML='';
    }
  }
  // aggiorna lista righe
  const list=document.getElementById('ndoc-righe-list');
  if(CFG_RIGHE.length===0){
    list.innerHTML='<div style="text-align:center;padding:20px;color:var(--mid);font-size:13px;font-style:italic">Nessuna porta aggiunta ancora</div>';
    return;
  }
  list.innerHTML=CFG_RIGHE.map((r,i)=>\`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:0.5px solid var(--border)">
      <div>
        <div style="font-size:13px;font-weight:500">\${r.nome_serie||''} \${r.nome_modello||''} — \${r.nome_finitura||''}</div>
        <div style="font-size:11px;color:var(--mid)">\${[r.nome_apertura,r.senso_apertura,r.larghezza_mm&&r.larghezza_mm+'×'+r.altezza_mm+' mm','sp.'+(r.spessore_mm||r.spessore_muro_mm||'?')+' mm'].filter(Boolean).join(' | ')}</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <div style="text-align:right">
          <div style="font-size:11px;color:var(--mid)">×\${r.quantita} — list. \${fmtEuro(r.prezzo_totale_riga)}</div>
          <div style="font-size:14px;font-weight:500;color:var(--red)">\${fmtEuro(r.prezzo_totale_riga*(1-sc1)*(1-sc2))}</div>
        </div>
        <button onclick="rimuoviRigaNdoc(\${i})" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:18px;padding:0 4px;line-height:1">×</button>
      </div>
    </div>\`).join('');
}

function rimuoviRigaNdoc(i){ CFG_RIGHE.splice(i,1); aggiornaTotaleNdoc(); }

function ndocAggiungiPorta(){
  const listino = document.getElementById('ndoc-listino')?.value||'A';
  window._prevListino=listino;
  CFG_TARGET_ID=null;
  CFG_MODE=document.getElementById('modal-nuovo-doc').dataset.mode;
  resetCFG();
  renderCfgStep('serie');
  ensureModalInBody('modal-cfg').classList.add('open');
}

function renderNuovoDocBozza(){ aggiornaTotaleNdoc(); }

async function salvaNuovoDoc(){
  try {
    const mode = document.getElementById('modal-nuovo-doc').dataset.mode;
    const clienteId=document.getElementById('ndoc-clienti').value;
    if(!clienteId){ toast('Seleziona un cliente','err'); return; }
    if(CFG_RIGHE.length===0){ toast('Aggiungi almeno una porta','err'); return; }

    const listino=document.getElementById('ndoc-listino').value||'A';
    const sc1=parseFloat(document.getElementById('ndoc-sconto1').value||0);
    const sc2=parseFloat(document.getElementById('ndoc-sconto2').value||0);
    const agenteId=document.getElementById('ndoc-agenti').value||null;
    const trasporto=document.getElementById('ndoc-trasporto').value||'Max Porte';
    // Il dropdown trasporto del form imposta la modalità; la card nel dettaglio calcola costo/zona
    const TRASP_MEZZO_MAP = {'Max Porte':'proprio','Vettore':'corriere','Cliente':'ritiro'};
    const trasportoMezzo = TRASP_MEZZO_MAP[trasporto] || 'proprio';
    const note=document.getElementById('ndoc-note').value||null;
    const ind=document.getElementById('ndoc-ind').value||null;
    const cap=document.getElementById('ndoc-cap').value||null;
    const cit=document.getElementById('ndoc-cit').value||null;
    const prv=document.getElementById('ndoc-prv').value||null;

    const imponibile=CFG_RIGHE.reduce((s,r)=>s+(r.prezzo_totale_riga||0),0);
    const netto=imponibile*(1-(sc1/100))*(1-(sc2/100));
    const haCustom=CFG_RIGHE.some(r=>r.misura_custom);

    // Provvigione agente
    const scontoEff=((1-(1-sc1/100)*(1-sc2/100))*100);
    let provvPct=0, provvEuro=0;
    if(agenteId){
      try {
        provvPct = await calcolaProvvigione(agenteId, scontoEff);
        provvEuro = Math.round(netto*(provvPct/100)*100)/100;
      } catch(e){ provvPct=0; provvEuro=0; }
    }

    const tabDoc = mode==='preventivo'?'preventivi':'ordini_vendita';
    const editId = document.getElementById('modal-nuovo-doc').dataset.editId || null;

    const docData = {
      anagrafica_id:clienteId, agente_id:agenteId||null,
      listino, sconto1:sc1, sconto2:sc2,
      indirizzo_destinazione:ind, cap_destinazione:cap,
      citta_destinazione:cit, provincia_destinazione:prv,
      trasporto,
      trasporto_mezzo:trasportoMezzo,
      resa: document.getElementById('ndoc-resa')?.value || 'Franco fabbrica',
      riferimento_cliente: document.getElementById('ndoc-rif-cliente')?.value?.trim() || null,
      note,
      totale_imponibile:imponibile, totale_netto:netto,
      provvigione_pct:provvPct, provvigione_euro:provvEuro,
      // Ritiro cliente → nessun costo/zona di trasporto
      ...(trasportoMezzo==='ritiro'?{costo_trasporto:0, zona_trasporto_id:null}:{}),
      ...(mode==='ordine'?{richiede_approvazione_tecnica:haCustom}:{})
    };

    let docId, docNumero;
    const RIGHE_FIELDS = ['codice_serie','nome_serie','codice_modello','nome_modello','codice_finitura','nome_finitura','pannello_bugna','codice_colore_alu','nome_colore_alu','codice_colore_pietra','nome_colore_pietra','codice_tipo_vetro','nome_tipo_vetro','codice_apertura','nome_apertura','senso_apertura','larghezza_mm','altezza_mm','misura_custom','spessore_muro_cm','spessore_muro_mm','codice_spalla','tipo_accessorio_telaio','codice_ferramenta','nome_ferramenta','codice_maniglia','nome_maniglia','codice_colore_maniglia','nome_colore_maniglia','prezzo_base','prezzo_vetro','prezzo_finitura','prezzo_bugna','prezzo_inserto','prezzo_apertura','prezzo_telaio','prezzo_accessorio_telaio','prezzo_ferramenta','prezzo_maniglia','prezzo_extra_incisioni','prezzo_unitario','quantita','sconto_riga','prezzo_totale_riga','note_riga','stanza','escludi_telaio','escludi_coprifili','coprifili_config','codice_imballo','prezzo_imballo_unitario','prezzo_imballo_totale','posata_da_noi'];

    if(editId){
      // MODIFICA — update del documento esistente (senza toccare numero/creato_da)
      docData.data_ultima_modifica = new Date().toISOString();
      // Se il preventivo era già stato inviato, torna a bozza — va reinviato
      if(mode==='preventivo') docData.stato = 'bozza';
      const {data:updated, error} = await sb.from(tabDoc).update(docData).eq('id',editId).select().single();
      if(error){ toast('Errore aggiornamento: '+error.message,'err'); return; }
      docId = editId;
      docNumero = updated.numero;

      // Elimina le righe vecchie e reinserisce quelle aggiornate
      const tabRighe = mode==='preventivo'?'righe_preventivo':'righe_ordine';
      const fk = mode==='preventivo'?'preventivo_id':'ordine_id';
      await sb.from(tabRighe).delete().eq(fk, editId);
      const righe = CFG_RIGHE.map((r,i)=>{const o={[fk]:editId,riga_numero:i+1};RIGHE_FIELDS.forEach(k=>{if(r[k]!==undefined)o[k]=r[k];});return o;});
      const {error:errRighe} = await sb.from(tabRighe).insert(righe);
      if(errRighe){ toast('Errore salvataggio righe: '+errRighe.message,'err'); return; }

    } else {
      // CREAZIONE — insert nuovo documento
      const anno = new Date().getFullYear();
      const seq = String(Date.now()).slice(-5);
      const prefisso = mode==='preventivo'?'PRV':'ORD';
      docData.numero = \`\${prefisso}-\${anno}-\${seq}\`;
      docData.creato_da = currentUser?.id;
      docData.nome_compilatore = currentNomeUtente||currentUser?.email||'—';

      const {data:doc, error} = await sb.from(tabDoc).insert([docData]).select().single();
      if(error){ toast('Errore salvataggio: '+error.message,'err'); return; }
      docId = doc.id;
      docNumero = doc.numero;

      const tabRighe = mode==='preventivo'?'righe_preventivo':'righe_ordine';
      const fk = mode==='preventivo'?'preventivo_id':'ordine_id';
      const righe = CFG_RIGHE.map((r,i)=>{const o={[fk]:docId,riga_numero:i+1};RIGHE_FIELDS.forEach(k=>{if(r[k]!==undefined)o[k]=r[k];});return o;});
      const {error:errRighe} = await sb.from(tabRighe).insert(righe);
      if(errRighe){ toast('Errore salvataggio righe: '+errRighe.message,'err'); return; }
    }

    toast(docNumero+(editId?' aggiornato':' salvato')+' con successo','ok');
    document.getElementById('modal-nuovo-doc').classList.remove('open');
    delete document.getElementById('modal-nuovo-doc').dataset.editId;
    CFG_RIGHE=[];
    if(mode==='preventivo') editId ? renderPreventivoDetail(docId) : renderPreventivi();
    else editId ? renderOrdineDetail(docId) : renderOrdiniDiretti();

  } catch(e) {
    console.error('salvaNuovoDoc error:', e);
    toast('Errore imprevisto: '+e.message,'err');
  }
}

async function renderPreventivoDetail(id){
  const [{data:prev},{data:righe}] = await Promise.all([
    sb.from('preventivi').select('*,anagrafiche(ragione_sociale,partita_iva,provincia,sede_op_provincia),agenti(nome,cognome)').eq('id',id).single(),
    sb.from('righe_preventivo').select('*').eq('preventivo_id',id).order('riga_numero'),
  ]);
  if(!prev) return;
  CFG_TARGET_ID=id; CFG_MODE='preventivo';
  window._prevListino=prev.listino;
  const trasportoCardHtml = await renderTrasportoCard('preventivo', prev, righe);

  const sc1=prev.sconto1||0; const sc2=prev.sconto2||0;
  const netto=prev.totale_imponibile*(1-sc1/100)*(1-sc2/100);

  const rowsRighe=(righe||[]).map(r=>\`
    <tr>
      <td style="font-size:12px;font-weight:500">\${r.riga_numero}</td>
      <td>
        <div style="font-size:13px;font-weight:500">\${r.nome_modello||''}</div>
        <div style="font-size:11px;color:var(--mid)">\${[r.nome_finitura,r.pannello_bugna,r.nome_apertura,r.senso_apertura,r.larghezza_mm&&r.larghezza_mm+'×'+r.altezza_mm+' mm','sp.'+(r.spessore_mm||r.spessore_muro_mm||'?')+' mm',r.nome_ferramenta,r.nome_maniglia].filter(Boolean).join(' | ')}</div>
        \${r.misura_custom?'<span style="font-size:10px;background:var(--red-bg);color:var(--red-tx);padding:1px 5px;border-radius:3px">Custom</span>':''}
      </td>
      <td style="text-align:center">\${r.quantita}</td>
      <td style="text-align:right">\${fmtEuro(r.prezzo_unitario)}</td>
      <td style="text-align:right;font-weight:500">\${fmtEuro(r.prezzo_totale_riga)}</td>
      <td style="white-space:nowrap">
        <button class="btn btn-sm" title="Modifica" onclick="modificaRiga('righe_preventivo','\${r.id}','\${id}','preventivo','\${prev.listino}')">&#9998;</button>
        <button class="btn btn-sm" style="color:var(--red)" title="Elimina" onclick="eliminaRiga('righe_preventivo','\${r.id}','\${id}','preventivo')">×</button>
      </td>
    </tr>\`).join('');

  document.getElementById('main-content').innerHTML=\`
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <div>
      <button class="btn btn-sm" onclick="renderPreventivi()">← Tutti i preventivi</button>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-sm" onclick="openConfiguratore('preventivo','\${id}','\${prev.listino}')">+ Aggiungi porta</button>
      <button class="btn btn-sm" onclick="esportaPDF('preventivo','\${id}')">📄 Esporta PDF</button>
      \${prev.stato==='bozza'?\`<button class="btn btn-sm" onclick="apriModalInvioPreventivo('\${id}')" style="display:inline-flex;align-items:center;gap:5px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Invia</button>\`:''}
      \${prev.stato==='inviato'?\`<button class="btn btn-red btn-sm" onclick="firmaPreventivo('\${id}')">Firma e converti in ordine</button>\`:''}
      \${prev.stato!=='confermato'?\`<button class="btn btn-sm" onclick="apriModificaPreventivo('\${id}')" style="display:inline-flex;align-items:center;gap:5px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Modifica</button>\`:''}
      \${prev.stato==='bozza'||prev.stato==='inviato'?\`<button class="btn btn-sm" style="color:var(--red);display:inline-flex;align-items:center;gap:5px" onclick="cambiaStatoPreventivo('\${id}','non_concluso')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>Non concluso</button>\`:''}
      \${prev.stato!=='confermato'?\`<button class="btn btn-sm" style="color:var(--red);display:inline-flex;align-items:center;gap:5px" onclick="eliminaPreventivo('\${id}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>Elimina</button>\`:''}

    </div>
  </div>
  <div class="grid-2" style="margin-bottom:14px">
    <div class="card">
      <div class="card-title">Intestazione preventivo</div>
      <table style="font-size:13px">
        <tr><td style="color:var(--mid);padding:3px 0;width:130px">N° Preventivo</td><td><strong>\${prev.numero}</strong></td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Cliente</td><td>\${prev.anagrafiche?.ragione_sociale||'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Agente</td><td>\${prev.agenti?prev.agenti.nome+' '+prev.agenti.cognome:'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Riferimento cliente</td><td><input type="text" value="\${(prev.riferimento_cliente||'').replace(/"/g,'&quot;')}" placeholder="—" onblur="salvaRiferimento('preventivo','\${id}',this.value)" style="width:100%;font-size:12px;padding:2px 6px;border:0.5px solid var(--border);border-radius:4px"></td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Data</td><td>\${fmtData(prev.data_creazione)}</td></tr>
        \${prev.data_ultima_modifica?\`<tr><td style="color:var(--mid);padding:3px 0">Ultima modifica</td><td>\${fmtData(prev.data_ultima_modifica)}</td></tr>\`:''}
        <tr><td style="color:var(--mid);padding:3px 0">Listino</td><td><span class="tag">\${prev.listino}</span></td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Trasporto</td><td>\${prev.trasporto||'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0;width:130px">Stato</td><td>\${badgeStato(prev.stato)}</td></tr>
        \${prev.nome_compilatore?\`<tr><td style="color:var(--mid);padding:3px 0">Compilato da</td><td style="font-size:12px">\${prev.nome_compilatore}</td></tr>\`:''}
      </table>
    </div>
    <div class="card">
      <div class="card-title">Riepilogo economico</div>
      <table style="font-size:13px">
        <tr><td style="color:var(--mid);padding:3px 0;width:130px">Imponibile\${(prev.costo_trasporto>0)?' (incl. trasporto)':''}</td><td style="text-align:right">\${fmtEuro(prev.totale_imponibile)}</td></tr>
        \${prev.costo_trasporto>0?\`<tr><td style="color:var(--mid);padding:3px 0;font-size:11px">di cui trasporto</td><td style="text-align:right;font-size:11px;color:var(--mid)">\${fmtEuro(prev.costo_trasporto)}</td></tr>\`:''}
        <tr><td style="color:var(--mid);padding:3px 0">Sconto 1</td><td style="text-align:right">\${sc1}%</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Sconto 2</td><td style="text-align:right">\${sc2||0}%</td></tr>
        <tr style="border-top:0.5px solid var(--border)"><td style="padding:6px 0;font-weight:500">Totale netto</td><td style="text-align:right;font-size:18px;font-weight:500;color:var(--mid)">\${fmtEuro(netto)}</td></tr>\${prev.totale_arrotondato?\`<tr><td style="color:var(--mid);padding:3px 0">Arrotondamento</td><td style="text-align:right">\${(prev.arrotondamento_euro>=0?'+':'')+fmtEuro(prev.arrotondamento_euro)}</td></tr><tr style="border-top:0.5px solid var(--border)"><td style="padding:6px 0;font-weight:500">Totale arrotondato</td><td style="text-align:right;font-size:18px;font-weight:500;color:var(--red)">\${fmtEuro(prev.totale_arrotondato)}</td></tr>\`:''}
      </table>
      \${prev.stato!=='confermato'?\`<div style="margin-top:10px;padding-top:10px;border-top:0.5px solid var(--border);display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span style="font-size:12px;color:var(--mid)">Arrotonda netto a:</span><input type="number" id="arr-totale-voluto" step="0.01" placeholder="\${netto.toFixed(2)}" value="\${prev.totale_arrotondato||''}" style="width:100px;font-size:13px;padding:3px 6px"><span style="font-size:12px;color:var(--mid)">&euro;</span><button class="btn btn-sm" onclick="salvaArrotondamento('\${id}',\${netto})">Salva</button>\${prev.totale_arrotondato?\`<button class="btn btn-sm" style="color:var(--red)" onclick="rimuoviArrotondamento('\${id}')">Rimuovi</button>\`:''}</div>\`:''}
      \${prev.note?\`<div style="margin-top:10px;font-size:12px;color:var(--mid)">\${prev.note}</div>\`:''}
    </div>
  </div>
  <div style="margin-bottom:14px">\${trasportoCardHtml}</div>
  <div class="card">
    <div class="card-header"><span class="card-title">Righe preventivo (\${righe?.length||0} porte)</span></div>
    <table>
      <thead><tr><th>#</th><th>Descrizione</th><th style="text-align:center">Q.tà</th><th style="text-align:right">Unitario</th><th style="text-align:right">Totale riga</th><th></th></tr></thead>
      <tbody>\${rowsRighe||'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--mid);font-style:italic">Nessuna porta — clicca "+ Aggiungi porta"</td></tr>'}</tbody>
    </table>
  </div>\`;
}

async function eliminaRiga(tabella, rigaId, docId, mode){
  if(!confirm('Eliminare questa riga?')) return;
  await sb.from(tabella).delete().eq('id',rigaId);
  // Rinumera le righe rimanenti in sequenza
  const fk = mode==='preventivo' ? 'preventivo_id' : 'ordine_id';
  const {data:rimanenti} = await sb.from(tabella).select('id,riga_numero').eq(fk,docId).order('riga_numero',{ascending:true});
  if(rimanenti && rimanenti.length){
    for(let i=0;i<rimanenti.length;i++){
      if(rimanenti[i].riga_numero !== i+1){
        await sb.from(tabella).update({riga_numero:i+1}).eq('id',rimanenti[i].id);
      }
    }
  }
  await ricalcolaTotale(docId, mode);
  if(mode==='preventivo') renderPreventivoDetail(docId);
  else renderOrdineDetail(docId);
  toast('Riga eliminata','ok');
}

async function cambiaStato(tabella, id, stato, callback){
  await sb.from(tabella).update({stato}).eq('id',id);
  toast('Stato aggiornato: '+stato,'ok');
  if(callback==='renderPreventivoDetail') renderPreventivoDetail(id);
  else if(callback==='renderOrdineDetail') renderOrdineDetail(id);
}

async function cambiaStatoPreventivo(id,nuovoStato){
  if(!confirm("Segnare come "+nuovoStato.replace("_"," ")+"?"))return;
  const {error}=await sb.from("preventivi").update({stato:nuovoStato}).eq("id",id);
  if(error){toast("Errore: "+error.message,"err");return;}
  toast("Stato aggiornato","ok");renderPreventivoDetail(id);
}

async function salvaArrotondamento(id, netto, tipo){
  tipo = tipo || 'preventivo';
  const tab = tipo==='ordine' ? 'ordini_vendita' : 'preventivi';
  const refresh = tipo==='ordine' ? renderOrdineDetail : renderPreventivoDetail;
  const val = parseFloat(document.getElementById('arr-totale-voluto')?.value);
  if(!val || val <= 0){ toast('Inserisci un importo valido','err'); return; }
  if(val > netto){ toast('Il totale arrotondato non puo superare il netto','err'); return; }
  const arrEuro = Math.round((val - netto) * 100) / 100;
  const { error } = await sb.from(tab).update({
    totale_arrotondato: val,
    arrotondamento_euro: arrEuro
  }).eq('id', id);
  if(error){ toast('Errore salvataggio: '+error.message,'err'); return; }
  toast('Arrotondamento salvato','ok');
  refresh(id);
}

async function rimuoviArrotondamento(id, tipo){
  tipo = tipo || 'preventivo';
  const tab = tipo==='ordine' ? 'ordini_vendita' : 'preventivi';
  const refresh = tipo==='ordine' ? renderOrdineDetail : renderPreventivoDetail;
  const { error } = await sb.from(tab).update({
    totale_arrotondato: null,
    arrotondamento_euro: null
  }).eq('id', id);
  if(error){ toast('Errore: '+error.message,'err'); return; }
  toast('Arrotondamento rimosso','ok');
  refresh(id);
}

async function eliminaPreventivo(id){
  if(!confirm("Eliminare definitivamente questo preventivo?"))return;
  await sb.from("righe_preventivo").delete().eq("preventivo_id",id);
  const {error}=await sb.from("preventivi").delete().eq("id",id);
  if(error){toast("Errore: "+error.message,"err");return;}
  toast("Preventivo eliminato","ok");renderPreventivi();
}

async function firmaPreventivo(prevId){
  if(!confirm('Convertire questo preventivo in ordine?')) return;
  const {data:prev} = await sb.from('preventivi').select('*').eq('id',prevId).single();
  const {data:righe} = await sb.from('righe_preventivo').select('*').eq('preventivo_id',prevId);
  const haCustom=(righe||[]).some(r=>r.misura_custom);
  const numero='ORD-'+new Date().getFullYear()+'-'+String(Date.now()).slice(-4);
  const {data:ord} = await sb.from('ordini_vendita').insert([{
    numero, preventivo_id:prevId,
    anagrafica_id:prev.anagrafica_id, agente_id:prev.agente_id,
    listino:prev.listino, sconto1:prev.sconto1, sconto2:prev.sconto2,
    indirizzo_destinazione:prev.indirizzo_destinazione,
    cap_destinazione:prev.cap_destinazione,
    citta_destinazione:prev.citta_destinazione,
    provincia_destinazione:prev.provincia_destinazione,
    trasporto:prev.trasporto, note:prev.note,
    zona_trasporto_id:prev.zona_trasporto_id||null,
    trasporto_mezzo:prev.trasporto_mezzo||'proprio',
    costo_trasporto:prev.costo_trasporto||0,
    totale_imponibile:prev.totale_imponibile,
    totale_netto:prev.totale_netto||prev.totale_imponibile,
    totale_arrotondato:prev.totale_arrotondato||null,
    arrotondamento_euro:prev.arrotondamento_euro||null,
    richiede_approvazione_tecnica:haCustom,
    stato:'in_attesa', creato_da:currentUser?.id, nome_compilatore:currentNomeUtente||currentUser?.email||'—'
  }]).select().single();

  if(ord?.data||ord){
    const ordId = ord.data?.id||ord.id;
    const righeOrd=(righe||[]).map(r=>{
      // Escludo i campi che non appartengono a righe_ordine (id, preventivo_id, created_at)
      const {id, preventivo_id, created_at, ...campiComuni} = r;
      return {
        ...campiComuni,
        ordine_id: ordId,
        riga_preventivo_id: r.id
      };
    });
    const {error:errRighe} = await sb.from('righe_ordine').insert(righeOrd);
    if(errRighe){ toast('Errore copia righe: '+errRighe.message,'err'); return; }
    await sb.from('preventivi').update({stato:'firmato'}).eq('id',prevId);
    toast(numero+' creato — in attesa di approvazione','ok');
    renderOrdineDetail(ordId);
  }
}

// ══════════════════════════════════════════════════════
// ORDINI DIRETTI
// ══════════════════════════════════════════════════════
async function renderOrdiniDiretti(){
  try {
    const {data,error} = await sb.from('ordini_vendita')
      .select('*,anagrafiche(ragione_sociale),agenti(nome,cognome)')
      .order('created_at',{ascending:false});
    if(error) throw error;
    window._ordData = data||[];
    const stats={in_attesa:0,approvato_comm:0,approvato_tec:0,in_produzione:0,evaso:0,bloccato:0};
    window._ordData.forEach(function(o){ if(stats[o.stato]!==undefined) stats[o.stato]++; });
    document.getElementById('main-content').innerHTML=
      '<div class="grid-4" style="margin-bottom:16px">'+
      '<div class="metric"><div class="metric-label">In attesa</div><div class="metric-value">'+stats.in_attesa+'</div></div>'+
      '<div class="metric"><div class="metric-label">Approvati</div><div class="metric-value" style="color:var(--green-tx)">'+(stats.approvato_comm+stats.approvato_tec)+'</div></div>'+
      '<div class="metric"><div class="metric-label">In produzione</div><div class="metric-value" style="color:var(--red)">'+stats.in_produzione+'</div></div>'+
      '<div class="metric"><div class="metric-label">Evasi</div><div class="metric-value">'+stats.evaso+'</div></div>'+
      '</div>'+
      '<div class="card">'+
        '<div class="card-header">'+
          '<span class="card-title">Conferme d&#39;ordine</span>'+
          '<div style="display:flex;gap:8px;align-items:center">'+
            '<input type="text" id="ord-cerca" placeholder="Cerca numero, cliente, riferimento..." '+
              'style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:340px" '+
              'oninput="filtraOrd(this.value)">'+
            '<button class="btn btn-red btn-sm" onclick="nuovoOrdineDiretto()">+ Nuova conferma d&#39;ordine</button>'+
          '</div>'+
        '</div>'+
        '<table>'+
          '<thead><tr><th>N°</th><th>Cliente</th><th>Rif. cliente</th><th>Agente</th><th>Data</th><th>Listino</th><th>Totale netto</th><th>Stato</th></tr></thead>'+
          '<tbody id="ord-tbody"></tbody>'+
        '</table>'+
      '</div>';
    filtraOrd('');
  } catch(e) {
    console.error('renderOrdiniDiretti error:',e);
    document.getElementById('main-content').innerHTML='<div class="card"><div style="padding:20px">'+
      '<p style="color:var(--red);margin-bottom:12px">Errore: '+e.message+'</p>'+
      '<button class="btn btn-red btn-sm" onclick="nuovoOrdineDiretto()">+ Nuova conferma d&#39;ordine</button>'+
      '</div></div>';
  }
}

function filtraOrd(filtro){
  var termini=(filtro||'').toLowerCase().split(/[\s,;]+/).filter(Boolean);
  var data=window._ordData||[];
  var filtered=termini.length?data.filter(function(o){
    var h=[o.numero||'',o.anagrafiche&&o.anagrafiche.ragione_sociale||'',
           o.riferimento_cliente||'',o.agenti?o.agenti.nome+' '+o.agenti.cognome:''].join(' ').toLowerCase();
    return termini.every(function(t){return h.includes(t);});
  }):data;
  var tbody=document.getElementById('ord-tbody');
  if(!tbody)return;
  if(!filtered.length){
    tbody.innerHTML='<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--mid);font-style:italic">'+(termini.length?'Nessun risultato':'Nessuna conferma d&#39;ordine')+'</td></tr>';
    return;
  }
  tbody.innerHTML=filtered.map(function(o){
    return '<tr class="data-row" onclick="renderOrdineDetail(this.dataset.id)" data-id="'+o.id+'">'+
      '<td><strong>'+(o.numero||'')+'</strong></td>'+
      '<td>'+(o.anagrafiche&&o.anagrafiche.ragione_sociale||'&#8212;')+'</td>'+
      '<td>'+(o.riferimento_cliente||'&#8212;')+'</td>'+
      '<td>'+(o.agenti?o.agenti.nome+' '+o.agenti.cognome:'&#8212;')+'</td>'+
      '<td>'+fmtData(o.data_ordine||o.created_at)+'</td>'+
      '<td><span class="tag">'+(o.listino||'')+'</span></td>'+
      '<td>'+fmtEuro(o.totale_netto||o.totale_imponibile)+'</td>'+
      '<td>'+badgeStato(o.stato)+'</td>'+
      '</tr>';
  }).join('');
}

async function apriModificaOrdine(id){
  const {data:ord}=await sb.from('ordini_vendita').select('*').eq('id',id).single();
  if(!ord){toast('Ordine non trovato','err');return;}
  const [{data:clienti},{data:agenti}]=await Promise.all([
    sb.from('anagrafiche').select('*').order('ragione_sociale'),
    sb.from('agenti').select('*').eq('attivo',true).order('cognome'),
  ]);
  CFG_RIGHE=[];
  const modal=ensureModalInBody('modal-nuovo-doc');
  modal.dataset.mode='ordine';
  modal.dataset.editId=id;
  document.getElementById('ndoc-title').textContent="Modifica conferma d'ordine";
  document.getElementById('ndoc-clienti').innerHTML='<option value="">Seleziona...</option>'+(clienti||[]).map(function(c){
    return '<option value="'+c.id+'"'+(c.id===ord.anagrafica_id?' selected':'')+
      ' data-listino="'+(c.listino||'A')+'" data-sa="'+(c.sconto_dedicato_A||0)+
      '" data-sp="'+(c.sconto_dedicato_P||0)+'" data-ind="'+(c.indirizzo||'')+
      '" data-cap="'+(c.cap||'')+'" data-cit="'+(c.citta||'')+'" data-prv="'+(c.provincia||'')+'">'+
      c.ragione_sociale+'</option>';
  }).join('');
  document.getElementById('ndoc-agenti').innerHTML='<option value="">Nessun agente</option>'+(agenti||[]).map(function(a){
    return '<option value="'+a.id+'"'+(a.id===ord.agente_id?' selected':'')+'>'+a.cognome+' '+a.nome+'</option>';
  }).join('');
  document.getElementById('ndoc-listino').value=ord.listino||'A';
  document.getElementById('ndoc-sconto1').value=ord.sconto1||0;
  var s2=document.getElementById('ndoc-sconto2');if(s2)s2.value=ord.sconto2||0;
  var tr=document.getElementById('ndoc-trasporto');if(tr)tr.value=ord.trasporto||'Max Porte';
  var re=document.getElementById('ndoc-resa');if(re)re.value=ord.resa||'Franco fabbrica';
  var rif=document.getElementById('ndoc-rif-cliente');if(rif)rif.value=ord.riferimento_cliente||'';
  document.getElementById('ndoc-ind').value=ord.indirizzo_destinazione||'';
  document.getElementById('ndoc-cap').value=ord.cap_destinazione||'';
  document.getElementById('ndoc-cit').value=ord.citta_destinazione||'';
  setProvinciaDest(ord.provincia_destinazione||'');
  var no=document.getElementById('ndoc-note');if(no)no.value=ord.note||'';
  const {data:righe}=await sb.from('righe_ordine').select('*').eq('ordine_id',id).order('riga_numero',{ascending:true});
  CFG_RIGHE=(righe||[]).map(function(r){return Object.assign({},r);});
  aggiornaTotaleNdoc();
  modal.classList.add('open');
}

async function nuovoOrdineDiretto(){
  try {
    const [{data:clienti},{data:agenti}] = await Promise.all([
      sb.from('anagrafiche').select('*').order('ragione_sociale'),
      sb.from('agenti').select('*').eq('attivo',true).order('cognome'),
    ]);
    CFG_RIGHE=[];
    const modal = ensureModalInBody('modal-nuovo-doc');
    if(!modal){ toast('Errore: modal non trovato','err'); return; }
    modal.dataset.mode='ordine';
    delete modal.dataset.editId;
    document.getElementById('ndoc-title').textContent="Nuova conferma d'ordine";
    document.getElementById('ndoc-clienti').innerHTML='<option value="">Seleziona cliente...</option>'+(clienti||[]).map(function(c){
      return '<option value="'+c.id+'" data-listino="'+(c.listino||'A')+'" data-sa="'+(c.sconto_dedicato_A||0)+
        '" data-sp="'+(c.sconto_dedicato_P||0)+'" data-ind="'+(c.indirizzo||'')+
        '" data-cap="'+(c.cap||'')+'" data-cit="'+(c.citta||'')+'" data-prv="'+(c.provincia||'')+'">'+c.ragione_sociale+'</option>';
    }).join('');
    document.getElementById('ndoc-agenti').innerHTML='<option value="">Nessun agente</option>'+(agenti||[]).map(function(a){
      return '<option value="'+a.id+'">'+a.cognome+' '+a.nome+'</option>';
    }).join('');
    document.getElementById('ndoc-righe-list').innerHTML='<div style="text-align:center;padding:20px;color:var(--mid);font-size:13px;font-style:italic">Nessuna porta aggiunta ancora \xe2\x80\x94 clicca \"+ Aggiungi porta\"</div>';
    setProvinciaDest('');
    document.getElementById('ndoc-totale').textContent='€ 0,00';
    modal.classList.add('open');
  } catch(e) {
    console.error('nuovoOrdineDiretto error:', e);
    toast('Errore apertura ordine: '+e.message,'err');
  }
}

async function renderOrdineDetail(id){
  const [{data:ord},{data:righe}] = await Promise.all([
    sb.from('ordini_vendita').select('*,anagrafiche(ragione_sociale,partita_iva,provincia,sede_op_provincia),agenti(nome,cognome),preventivi(numero)').eq('id',id).single(),
    sb.from('righe_ordine').select('*').eq('ordine_id',id).order('riga_numero'),
  ]);
  if(!ord) return;
  CFG_TARGET_ID=id; CFG_MODE='ordine';
  window._prevListino=ord.listino;
  const trasportoCardHtml = await renderTrasportoCard('ordine', ord, righe);

  const sc1=ord.sconto1||0; const sc2=ord.sconto2||0;
  const netto=ord.totale_imponibile*(1-sc1/100)*(1-sc2/100);

  const possoApprovareComm = isRespComm();
  const possoApprovaTec = isRespTec();

  const rowsRighe=(righe||[]).map(function(r){
    return '<tr>'+
      '<td style="font-size:12px;font-weight:500">'+r.riga_numero+'</td>'+
      '<td>'+
        '<div style="font-size:13px;font-weight:500">'+(r.nome_modello||'')+'</div>'+
        '<div style="font-size:11px;color:var(--mid)">'+(
          [r.nome_finitura,r.pannello_bugna,r.nome_apertura,r.senso_apertura,
           r.larghezza_mm&&r.larghezza_mm+'×'+r.altezza_mm+' mm',
           'sp.'+(r.spessore_mm||r.spessore_muro_mm||'?')+' mm',r.nome_ferramenta,r.nome_maniglia
          ].filter(Boolean).join(' | ')
        )+'</div>'+
        (r.misura_custom?'<span style="font-size:10px;background:var(--red-bg);color:var(--red-tx);padding:1px 5px;border-radius:3px">Custom</span>':'')+
      '</td>'+
      '<td style="text-align:center">'+r.quantita+'</td>'+
      '<td style="text-align:right">'+fmtEuro(r.prezzo_unitario)+'</td>'+
      '<td style="text-align:right;font-weight:500">'+fmtEuro(r.prezzo_totale_riga)+'</td>'+
      '<td style="white-space:nowrap">'+'<button class="btn btn-sm" title="Modifica" onclick="modificaRiga(\\'righe_ordine\\',\\''+r.id+'\\',\\''+id+'\\',\\'ordine\\',\\''+(ord.listino||'A')+'\\')">✎</button>'+
      '<button class="btn btn-sm" style="color:var(--red)" onclick="eliminaRiga(\\'righe_ordine\\',\\''+r.id+'\\',\\''+id+'\\',\\'ordine\\')">&times;</button>'+
      '</td>'+
      '</tr>';
  }).join('');

  var bottoniApprovazione='';
  if(ord.stato==='in_attesa'&&possoApprovareComm){
    bottoniApprovazione='<button class="btn btn-red btn-sm" onclick="approvaOrdine(\\''+id+'\\',\\'comm\\')">Approva (commerciale)</button> '+
      '<button class="btn btn-sm" onclick="cambiaStato(\\'ordini_vendita\\',\\''+id+'\\',\\'bloccato\\',\\'renderOrdineDetail\\')">Blocca</button>';
  }
  if(ord.stato==='approvato_comm'&&ord.richiede_approvazione_tecnica&&possoApprovaTec){
    bottoniApprovazione+='<button class="btn btn-red btn-sm" onclick="approvaOrdine(\\''+id+'\\',\\'tec\\')">Approva (tecnico)</button>';
  }
  if((ord.stato==='approvato_comm'&&!ord.richiede_approvazione_tecnica)||(ord.stato==='approvato_tec')){
    bottoniApprovazione+='<button class="btn btn-red btn-sm" onclick="cambiaStato(\\'ordini_vendita\\',\\''+id+'\\',\\'in_produzione\\',\\'renderOrdineDetail\\')">Lancia in produzione</button>';
  }

  var puoModificare = ord.stato==='in_attesa';

  document.getElementById('main-content').innerHTML=
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">'+
    '<div><button class="btn btn-sm" onclick="renderOrdiniDiretti()">← Tutte le conferme d&#39;ordine</button></div>'+
    '<div style="display:flex;gap:8px">'+
      (puoModificare?
        '<button class="btn btn-sm" onclick="openConfiguratore(\\'ordine\\',\\''+id+'\\',\\''+ord.listino+'\\')">+ Aggiungi porta</button>'+
        '<button class="btn btn-sm" onclick="esportaPDF(\\'ordine\\',\\''+id+'\\')">&#128196; Esporta PDF</button>'+
        '<button class="btn btn-sm" onclick="apriModificaOrdine(\\''+id+'\\')" style="display:inline-flex;align-items:center;gap:5px">'+
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Modifica</button>'+
        '<button class="btn btn-sm" style="color:var(--red);display:inline-flex;align-items:center;gap:5px" onclick="eliminaOrdineDiretto(\\''+id+'\\')">'+
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>Elimina</button>'
      :'')+
      bottoniApprovazione+
    '</div></div>'+
    '<div class="grid-2" style="margin-bottom:14px">'+
      '<div class="card">'+
        '<div class="card-title">Intestazione ordine</div>'+
        '<table style="font-size:13px">'+
          '<tr><td style="color:var(--mid);padding:3px 0;width:130px">N° Ordine</td><td><strong>'+(ord.numero||'')+'</strong></td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Cliente</td><td>'+(ord.anagrafiche?.ragione_sociale||'—')+'</td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Riferimento cliente</td><td><input type="text" value="'+((ord.riferimento_cliente||'').replace(/"/g,'&quot;'))+'" placeholder="—" onblur="salvaRiferimento(\\'ordine\\',\\''+id+'\\',this.value)" style="width:100%;font-size:12px;padding:2px 6px;border:0.5px solid var(--border);border-radius:4px"></td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Agente</td><td>'+(ord.agenti?ord.agenti.nome+' '+ord.agenti.cognome:'—')+'</td></tr>'+
          (ord.preventivo_id?'<tr><td style="color:var(--mid);padding:3px 0">Da preventivo</td><td><span class="badge bb" style="cursor:pointer" onclick="renderPreventivoDetail(\\''+ord.preventivo_id+'\\')">'+(ord.preventivi?.numero||'Sì')+'</span></td></tr>':'')+
          '<tr><td style="color:var(--mid);padding:3px 0">Data</td><td>'+fmtData(ord.data_ordine||ord.created_at)+'</td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Listino</td><td><span class="tag">'+(ord.listino||'')+'</span></td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Trasporto</td><td>'+(ord.trasporto||'—')+'</td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Sett. approntamento</td><td><input type="text" id="ord-sett-appront" value="'+(ord.settimana_consegna||'')+'" placeholder="es. SETT. 42" onblur="salvaSettimanaAppront(\\''+id+'\\',this.value)" style="width:110px;font-size:12px;padding:2px 6px;border:0.5px solid var(--border);border-radius:4px"></td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Approvazione</td><td>'+(ord.richiede_approvazione_tecnica?'<span class="badge br">Tecnica richiesta</span>':'<span class="badge bg">Solo commerciale</span>')+'</td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Stato</td><td>'+badgeStato(ord.stato)+'</td></tr>'+
          (ord.nome_compilatore?'<tr><td style="color:var(--mid);padding:3px 0">Compilato da</td><td style="font-size:12px">'+ord.nome_compilatore+'</td></tr>':'')+
        '</table>'+
      '</div>'+
      '<div class="card">'+
        '<div class="card-title">Riepilogo economico</div>'+
        '<table style="font-size:13px">'+
          '<tr><td style="color:var(--mid);padding:3px 0;width:130px">Imponibile'+(ord.costo_trasporto>0?' (incl. trasporto)':'')+'</td><td style="text-align:right">'+fmtEuro(ord.totale_imponibile)+'</td></tr>'+
          (ord.costo_trasporto>0?'<tr><td style="color:var(--mid);padding:3px 0;font-size:11px">di cui trasporto</td><td style="text-align:right;font-size:11px;color:var(--mid)">'+fmtEuro(ord.costo_trasporto)+'</td></tr>':'')+
          '<tr><td style="color:var(--mid);padding:3px 0">Sconto 1</td><td style="text-align:right">'+sc1+'%</td></tr>'+
          '<tr><td style="color:var(--mid);padding:3px 0">Sconto 2</td><td style="text-align:right">'+(sc2||0)+'%</td></tr>'+
          '<tr style="border-top:0.5px solid var(--border)"><td style="padding:6px 0;font-weight:500">Totale netto</td><td style="text-align:right;font-size:'+(ord.totale_arrotondato?'14px':'18px')+';font-weight:500;color:'+(ord.totale_arrotondato?'var(--mid)':'var(--red)')+'">'+fmtEuro(netto)+'</td></tr>'+
          (ord.totale_arrotondato?'<tr><td style="color:var(--mid);padding:3px 0">Arrotondamento</td><td style="text-align:right">'+(ord.arrotondamento_euro>=0?'+':'')+fmtEuro(ord.arrotondamento_euro)+'</td></tr><tr style="border-top:0.5px solid var(--border)"><td style="padding:6px 0;font-weight:500">Totale arrotondato</td><td style="text-align:right;font-size:18px;font-weight:500;color:var(--red)">'+fmtEuro(ord.totale_arrotondato)+'</td></tr>':'')+
        '</table>'+
        ((!ord.preventivo_id && ord.stato!=='confermato')?'<div style="margin-top:10px;padding-top:10px;border-top:0.5px solid var(--border);display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span style="font-size:12px;color:var(--mid)">Arrotonda netto a:</span><input type="number" id="arr-totale-voluto" step="0.01" placeholder="'+netto.toFixed(2)+'" value="'+(ord.totale_arrotondato||'')+'" style="width:100px;font-size:13px;padding:3px 6px"><span style="font-size:12px;color:var(--mid)">&euro;</span><button class="btn btn-sm" onclick="salvaArrotondamento(\\''+id+'\\','+netto+',\\'ordine\\')">Salva</button>'+(ord.totale_arrotondato?'<button class="btn btn-sm" style="color:var(--red)" onclick="rimuoviArrotondamento(\\''+id+'\\',\\'ordine\\')">Rimuovi</button>':'')+'</div>':'')+
        (ord.note?'<div style="margin-top:10px;font-size:12px;color:var(--mid)">'+ord.note+'</div>':'')+
      '</div>'+
    '</div>'+
    '<div style="margin-bottom:14px">'+trasportoCardHtml+'</div>'+
    '<div class="card">'+
      '<div class="card-header"><span class="card-title">Righe ordine ('+(righe?.length||0)+' porte)</span></div>'+
      '<table>'+
        '<thead><tr><th>#</th><th>Descrizione</th><th style="text-align:center">Q.tà</th><th style="text-align:right">Unitario</th><th style="text-align:right">Totale riga</th><th></th></tr></thead>'+
        '<tbody>'+(rowsRighe||'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--mid);font-style:italic">Nessuna porta — clicca \"+ Aggiungi porta\"</td></tr>')+'</tbody>'+
      '</table>'+
    '</div>';
}

async function eliminaOrdineDiretto(id){
  if(!confirm('Eliminare definitivamente questa conferma d&#39;ordine?'))return;
  await sb.from('righe_ordine').delete().eq('ordine_id',id);
  const {error}=await sb.from('ordini_vendita').delete().eq('id',id);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Ordine eliminato','ok');renderOrdiniDiretti();
}


async function salvaRiferimento(tipo, id, val){
  const tab = tipo==='ordine' ? 'ordini_vendita' : 'preventivi';
  const { error } = await sb.from(tab).update({riferimento_cliente: val.trim()||null}).eq('id', id);
  if(error){ toast('Errore salvataggio: '+error.message,'err'); return; }
  toast('Riferimento salvato','ok');
}

async function salvaSettimanaAppront(id, val){
  const { error } = await sb.from('ordini_vendita').update({settimana_consegna: val.trim()||null}).eq('id', id);
  if(error){ toast('Errore salvataggio: '+error.message,'err'); return; }
  toast('Settimana approntamento salvata','ok');
}

async function approvaOrdine(id, tipo){
  const stato = tipo==='comm'?'approvato_comm':'approvato_tec';
  const campoData = tipo==='comm'?'data_approvazione_comm':'data_approvazione_tec';
  const campoUser = tipo==='comm'?'approvato_da_comm':'approvato_da_tec';
  await sb.from('ordini_vendita').update({stato,[campoData]:new Date().toISOString(),[campoUser]:currentUser?.id}).eq('id',id);
  await sb.from('log_approvazioni').insert([{ordine_id:id,user_id:currentUser?.id,azione:stato}]);
  toast('Ordine approvato','ok');
  renderOrdineDetail(id);
}

// ══════════════════════════════════════════════════════
// PANNELLO SUPER-ADMIN — navigazione e struttura
// ══════════════════════════════════════════════════════

const ADMIN_SECTIONS = [
  {id:'catalogo',    label:'Catalogo',          icon:'M4 4h8v8H4zM10 2h4v4h-4zM2 10h4v4H2z'},
  {id:'prezzi',      label:'Prezzi e listini',  icon:'M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z'},
  {id:'telaio',      label:'Telaio e componenti',icon:'M2 8h12M8 2v12'},
  {id:'distinte',    label:'Distinte base',     icon:'M3 3h10v2H3zM3 7h10v2H3zM3 11h6v2H3z'},
  {id:'compatibilita',label:'Compatibilità',    icon:'M2 8h5M9 8h5M8 2v5M8 9v5'},
  {id:'lavorazioni', label:'Lavorazioni extra', icon:'M4 2h8l2 4-10 0zM2 6h12v10H2zM6 10h4'},
  {id:'spedizioni',  label:'Imballi e trasporti', icon:'M1 1.5h1.8l1.3 8.2a1 1 0 0 0 1 .8h6.4a1 1 0 0 0 1-.78L14.8 4H3.6'},
  {id:'agenti',        label:'Agenti',             icon:'M8 5a3 3 0 100 6 3 3 0 000-6zM2 14c0-3 2-5 6-5s6 2 6 5'},
  {id:'impostazioni',  label:'Impostazioni',       icon:'M8 5a3 3 0 100 6M8 1v2M8 13v2M1 8h2M13 8h2'},
  {id:'magazzino_admin',label:'Magazzino',         icon:'M2 4h12v10H2zM2 4l6-3 6 3M6 14v-4h4v4'},
];

const ADMIN_SUB = {
  catalogo:   ['serie','modelli','finiture','aperture','ferramenta','maniglie'],
  prezzi:     ['listini','sovrapprezzi','scontistiche'],
  telaio:     ['spalle','regole','scorrevoli_int','scorrevoli_ext','coprifili','colori'],
  distinte:   ['db_modelli'],
  agenti:     ['agenti_lista'],
  impostazioni:['generale','utenti'],
  magazzino_admin:['categorie'],
  spedizioni:['imballi','trasporti'],
};

let adminSection = 'catalogo';
let adminSub = 'serie';

async function renderAdmin(){
  if(!isAdmin()){
    document.getElementById('main-content').innerHTML='<div class="card"><p style="color:var(--red)">Accesso non autorizzato.</p></div>';
    return;
  }
  const navHtml = ADMIN_SECTIONS.map(s=>\`
    <div onclick="switchAdminSection('\${s.id}')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;border-radius:var(--radius);font-size:13px;
      background:\${adminSection===s.id?'rgba(208,32,26,0.08)':'transparent'};
      color:\${adminSection===s.id?'var(--red)':'var(--mid)'};font-weight:\${adminSection===s.id?'500':'400'}">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="\${s.icon}"/></svg>
      \${s.label}
    </div>\`).join('');

  document.getElementById('main-content').innerHTML=\`
  <div style="display:flex;gap:0;height:calc(100vh - 50px);overflow:hidden">
    <div style="width:180px;min-width:180px;border-right:0.5px solid var(--border);padding:12px 8px;overflow-y:auto;background:var(--white)">
      <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;color:var(--mid);padding:0 4px 8px">Configurazione</div>
      \${navHtml}
    </div>
    <div style="flex:1;overflow-y:auto;padding:20px" id="admin-main"></div>
  </div>\`;
  loadAdminSection();
}

function switchAdminSection(sec){
  adminSection=sec;
  adminSub=ADMIN_SUB[sec]?.[0]||'';
  renderAdmin();
}

function loadAdminSection(){
  if(adminSection==='catalogo') adminCatalogo();
  else if(adminSection==='prezzi') adminPrezzi();
  else if(adminSection==='telaio') adminTelaioPanel();
  else if(adminSection==='distinte') adminDistinteMain();
  else if(adminSection==='compatibilita') adminCompatibilita();
  else if(adminSection==='lavorazioni') adminLavorazioni();
  else if(adminSection==='agenti') adminAgenti();
  else if(adminSection==='impostazioni') adminImpostazioni();
  else if(adminSection==='magazzino_admin') adminMagazzino();
  else if(adminSection==='spedizioni') adminSpedizioni();
}

// ── HELPER UI ──────────────────────────────────────────
function adminSubTabs(tabs, active, onclick){
  return \`<div style="display:flex;gap:0;margin-bottom:16px;border-bottom:0.5px solid var(--border)">
    \${tabs.map(t=>\`<div onclick="\${onclick}('\${t.id}')" style="padding:8px 16px;cursor:pointer;font-size:13px;border-bottom:\${active===t.id?'2px solid var(--red)':'2px solid transparent'};color:\${active===t.id?'var(--red)':'var(--mid)'};font-weight:\${active===t.id?'500':'400'};margin-bottom:-0.5px">\${t.label}</div>\`).join('')}
  </div>\`;
}

function adminCard(title, content, actions=''){
  return \`<div class="card" style="margin-bottom:14px">
    <div class="card-header">\${title?\`<span class="card-title">\${title}</span>\`:''}\${actions}</div>
    \${content}
  </div>\`;
}

function inlineInput(val, onchange, width='80px', type='number', placeholder=''){
  return \`<input type="\${type}" value="\${val??''}" placeholder="\${placeholder}" step="0.01"
    style="width:\${width};padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:12px;font-family:inherit"
    onchange="\${onchange}">\`;
}

function adminToggle(attivo, onclick){
  return \`<span class="badge \${attivo?'bg':'br'}" style="cursor:pointer" onclick="\${onclick}">\${attivo?'Attivo':'Inattivo'}</span>\`;
}

// ══════════════════════════════════════════════════════
// CATALOGO
// ══════════════════════════════════════════════════════
function adminCatalogo(){
  const tabs=[
    {id:'serie',label:'Serie'},{id:'modelli',label:'Modelli'},
    {id:'finiture',label:'Finiture'},{id:'aperture',label:'Aperture e sensi'},
    {id:'misure',label:'Misure std'},{id:'supplementi',label:'Suppl. COM/FM'},
    {id:'ferramenta',label:'Ferramenta'},{id:'maniglie',label:'Maniglie'},
    {id:'serrature',label:'Serrature'},{id:'cilindri',label:'Cilindri'},
    {id:'colori_maniglia',label:'Colori maniglia'},{id:'pomolini',label:'Pomolini WC'},
  ];
  const el=document.getElementById('admin-main');
  el.innerHTML=adminSubTabs(tabs,adminSub,'switchAdminCat')+'<div id="admin-sub"></div>';
  switchAdminCat(adminSub||'serie');
}

function switchAdminCat(sub){
  adminSub=sub;
  document.querySelectorAll('#admin-main [onclick^="switchAdminCat"]').forEach(t=>{
    const isActive=t.getAttribute('onclick').includes(\`'\${sub}'\`);
    t.style.borderBottom=isActive?'2px solid var(--red)':'2px solid transparent';
    t.style.color=isActive?'var(--red)':'var(--mid)';
    t.style.fontWeight=isActive?'500':'400';
  });
  if(sub==='serie') adminSerie();
  else if(sub==='modelli') adminModelli();
  else if(sub==='finiture') adminFiniture();
  else if(sub==='aperture') adminAperture();
  else if(sub==='misure') adminMisure();
  else if(sub==='supplementi') adminSupplementiComFm();
  else if(sub==='ferramenta') adminFerramenta();
  else if(sub==='maniglie') adminManiglie();
  else if(sub==='serrature') adminSerrature();
  else if(sub==='cilindri') adminCilindri();
  else if(sub==='colori_maniglia') adminColoriManiglia();
  else if(sub==='pomolini') adminPomolini();
}

// SERIE
async function adminSerie(){
  const {data} = await sb.from('serie').select('*').order('nome');
  const {data:imballi} = await sb.from('listino_imballi').select('codice,descrizione').eq('attivo',true).order('descrizione');
  const imbOpts=(sel)=>\`<option value="">— nessuno —</option>\`+(imballi||[]).map(i=>\`<option value="\${i.codice}" \${i.codice===sel?'selected':''}>\${i.descrizione}</option>\`).join('');
  const rows=(data||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.codice,\`adminSalva('serie','\${s.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(s.nome,\`adminSalva('serie','\${s.id}','nome',this.value)\`,'130px','text')}</td>
    <td>\${inlineInput(s.descrizione||'',\`adminSalva('serie','\${s.id}','descrizione',this.value)\`,'180px','text','Descrizione')}</td>
    <td><select onchange="adminSalva('serie','\${s.id}','codice_imballo',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:11px">\${imbOpts(s.codice_imballo)}</select></td>
    <td><select onchange="adminSalva('serie','\${s.id}','codice_imballo_posa',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:11px">\${imbOpts(s.codice_imballo_posa)}</select></td>
    <td style="text-align:center"><input type="checkbox" \${s.imballo_fragile?'checked':''} onchange="toggleCampo('serie','\${s.id}','imballo_fragile',\${!!s.imballo_fragile})" title="Prodotti fragili/vetro: applica supplemento"></td>
    <td>
      \${s.immagine_url?\`<img src="\${s.immagine_url}" style="width:36px;height:36px;object-fit:cover;border-radius:4px;margin-right:6px">\`:'<span style="font-size:11px;color:var(--mid)">—</span>'}
      <label style="cursor:pointer"><input type="file" accept="image/*" style="display:none" onchange="uploadImmagine('serie','\${s.id}',this)"><span class="btn btn-sm" style="font-size:11px">📷</span></label>
    </td>
    <td>\${adminToggle(s.attiva,\`toggleCampo('serie','\${s.id}','attiva',\${s.attiva})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('serie','\${s.id}','adminSerie')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px" title="Elimina">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Serie',\`
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Descrizione</th><th>Imballo</th><th>Imballo se posata</th><th style="text-align:center" title="Fragile / vetro">Fragile</th><th>Immagine</th><th>Stato</th><th></th></tr></thead>
    <tbody>\${rows}</tbody></table>
    <div style="font-size:11px;color:var(--mid);margin-top:8px">"Imballo" = imballo di default della serie. "Imballo se posata" = imballo alternativo per le porte posate da noi. "Fragile" = aggiunge il supplemento fragili/vetro.</div>\`,
    \`<button class="btn btn-red btn-sm" onclick="nuovaRiga('serie',{codice:'NUOVA',nome:'Nuova serie',attiva:true},'adminSerie')">+ Aggiungi serie</button>\`);
}

// MODELLI
async function adminModelli(){
  const {data:serie} = await sb.from('serie').select('codice,nome').order('nome');
  
  // Filtro serie corrente
  const serieFilter = window._adminModelliSerie || document.getElementById('admin-modelli-serie-filter')?.value || serie?.[0]?.codice || '';
  window._adminModelliSerie = serieFilter;
  
  const {data:modelli} = await sb.from('modelli')
    .select('*,prezzi_modello(listino,prezzo_base,prezzo_vetro,vetro_incluso,ha_extra_incisioni,prezzo_extra_incisioni)')
    .eq('codice_serie', serieFilter)
    .order('nome');

  const rows=(modelli||[]).map(m=>{
    const pa=m.prezzi_modello?.find(p=>p.listino==='A');
    const pp=m.prezzi_modello?.find(p=>p.listino==='P');
    const flags=['ha_vetro','ha_pannello_o_bugna','ha_inserto_alluminio','ha_inserto_pietra','ha_pantografatura'];
    const flagLabels={ha_vetro:'V',ha_pannello_o_bugna:'P',ha_inserto_alluminio:'A',ha_inserto_pietra:'I',ha_pantografatura:'T'};
    const flagHtml=flags.map(f=>\`<span title="\${f.replace(/_/g,' ')}" style="display:inline-block;width:16px;height:16px;border-radius:3px;margin-right:2px;cursor:pointer;
      background:\${m[f]?'var(--green-bg)':'var(--border)'};border:0.5px solid \${m[f]?'var(--green-tx)':'var(--mid)'};
      color:\${m[f]?'var(--green-tx)':'var(--mid)'};font-size:9px;text-align:center;line-height:16px;font-weight:500"
      onclick="toggleCampo('modelli','\${m.id}','\${f}',\${m[f]})">\${flagLabels[f]}</span>\`).join('');
    return \`<tr>
      <td>\${inlineInput(m.codice,\`adminSalva('modelli','\${m.id}','codice',this.value)\`,'70px','text')}</td>
      <td>\${inlineInput(m.nome,\`adminSalva('modelli','\${m.id}','nome',this.value)\`,'150px','text')}</td>
      <td><select onchange="adminSalva('modelli','\${m.id}','codice_serie',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:12px">
        \${(serie||[]).map(s=>\`<option value="\${s.codice}" \${s.codice===m.codice_serie?'selected':''}>\${s.codice}</option>\`).join('')}
      </select></td>
      <td><select onchange="adminSalva('modelli','\${m.id}','tipo_variante',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:11px">
        <option value="" \${!m.tipo_variante?'selected':''}>—</option>
        <option value="PERSONALIZZATA" \${m.tipo_variante==='PERSONALIZZATA'?'selected':''}>Personalizzata</option>
        <option value="STANDARD" \${m.tipo_variante==='STANDARD'?'selected':''}>Standard</option>
      </select></td>
      <td>\${flagHtml}</td>
      <td>\${inlineInput(pa?.prezzo_base||'',\`salvaPrezzo('\${m.codice}','A','prezzo_base',this.value)\`,'70px')}</td>
      <td>\${inlineInput(pp?.prezzo_base||'',\`salvaPrezzo('\${m.codice}','P','prezzo_base',this.value)\`,'70px')}</td>
      <td>\${m.ha_vetro?\`
        <div style="display:flex;align-items:center;gap:4px">
          \${inlineInput(pa?.vetro_incluso?'INCL':pa?.prezzo_vetro||'',\`salvaPrezzo('\${m.codice}','A','prezzo_vetro',this.value)\`,'60px')}
          <span title="Vetro incluso nel prezzo porta" style="cursor:pointer;font-size:10px;color:\${pa?.vetro_incluso?'var(--green-tx)':'var(--mid)'}" onclick="toggleVetroIncluso('\${m.codice}',\${!!pa?.vetro_incluso})">\${pa?.vetro_incluso?'✓incl':'libero'}</span>
        </div>\`:'—'}</td>
      <td>\${pa?.ha_extra_incisioni?inlineInput(pa?.prezzo_extra_incisioni||'',\`salvaPrezzo('\${m.codice}','A','prezzo_extra_incisioni',this.value)\`,'65px'):'<span style="font-size:11px;color:var(--mid)">No</span>'}</td>
      <td>\${inlineInput(m.supplemento_staffe_a??0,\`adminSalva('modelli','\${m.id}','supplemento_staffe_a',this.value)\`,'65px','number','€ A')}</td>
      <td>\${inlineInput(m.supplemento_staffe_p??0,\`adminSalva('modelli','\${m.id}','supplemento_staffe_p',this.value)\`,'65px','number','€ P')}</td>
      <td>\${inlineInput(m.qta_minima??1,\`adminSalva('modelli','\${m.id}','qta_minima',this.value)\`,'50px','number','min')}</td>
      <td><select onchange=\"adminSalva('modelli','\${m.id}','step_quantita',this.value)\" style=\"padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:11px\">
        <option value=\"1\" \${(Number(m.step_quantita)||1)===1?'selected':''}>Intere</option>
        <option value=\"0.5\" \${Number(m.step_quantita)===0.5?'selected':''}>Anche mezze</option>
      </select></td>
      <td>
        \${m.immagine_url?\`<img src="\${m.immagine_url}" style="width:32px;height:32px;object-fit:cover;border-radius:4px;margin-right:4px">\`:''}
        <label style="cursor:pointer"><input type="file" accept="image/*" style="display:none" onchange="uploadImmagine('modelli','\${m.id}',this)"><span style="font-size:11px;cursor:pointer;color:var(--red)">📷</span></label>
      </td>
      <td>\${adminToggle(m.attivo,\`toggleCampo('modelli','\${m.id}','attivo',\${m.attivo})\`)}</td>
      <td><button onclick="eliminaRigaAdmin('modelli','\${m.id}','adminModelli')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px" title="Elimina">×</button></td>
    </tr>\`;
  }).join('');

  const serieOpts = (serie||[]).map(s=>\`<option value="\${s.codice}" \${s.codice===serieFilter?'selected':''}>\${s.codice} — \${s.nome}</option>\`).join('');

  document.getElementById('admin-sub').innerHTML=\`
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
    <label style="font-size:12px;color:var(--mid)">Serie:</label>
    <select id="admin-modelli-serie-filter" onchange="window._adminModelliSerie=this.value;adminModelli()" style="padding:5px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit">\${serieOpts}</select>
    <span style="font-size:12px;color:var(--mid)">\${(modelli||[]).length} modelli</span>
    <button class="btn btn-red btn-sm" onclick="nuovoModello('\${serieFilter}')">+ Aggiungi modello</button>
  </div>
  \${adminCard(\`Modelli — \${serieFilter}\`,\`
    <div style="font-size:11px;color:var(--mid);margin-bottom:8px">Flag cliccabili: <b>V</b>=vetro <b>P</b>=pannello/bugna <b>A</b>=inserto alluminio <b>I</b>=inserto pietra <b>T</b>=pantografatura</div>
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Codice</th><th>Nome</th><th>Serie</th><th>Variante</th><th>Flag</th><th>Prezzo A</th><th>Prezzo P</th><th>Vetro A</th><th>Extra incis.</th><th>Staffe A</th><th>Staffe P</th><th>Q.min</th><th>Step</th><th>Img</th><th>Stato</th><th></th></tr></thead>
      <tbody>\${rows}</tbody>
    </table></div>\`)}\`;
}

async function toggleVetroIncluso(codModello, attualeIncluso){
  await sb.from('prezzi_modello').update({vetro_incluso:!attualeIncluso}).eq('codice_modello',codModello);
  toast(!attualeIncluso?'Vetro ora incluso nel prezzo':'Vetro ora separato','ok');
  adminModelli();
}

async function nuovoModello(seriePreselezionata){
  const {data:serie} = await sb.from('serie').select('codice,nome').order('nome');
  const cod=prompt('Codice modello (es. TAM-048):'); if(!cod) return;
  const nome=prompt('Nome modello:'); if(!nome) return;
  const serie_cod = seriePreselezionata || prompt('Codice serie ('+( serie||[]).map(s=>s.codice).join('/')+'):');
  if(!serie_cod) return;
  const {error}=await sb.from('modelli').insert([{codice:cod.toUpperCase(),nome,codice_serie:serie_cod.toUpperCase(),attivo:true}]);
  if(error){toast(msgErrore(error,cod),'err');return;}
  toast('Modello '+cod+' aggiunto','ok'); adminModelli();
}

// FINITURE
async function adminFiniture(){
  const {data:serie} = await sb.from('serie').select('codice,e_laccata').order('codice');
  // Popola la cache delle serie laccate
  window._serieLaccate = new Set((serie||[]).filter(s=>s.e_laccata).map(s=>s.codice));
  const serieFilter = window._adminFinSerie || document.getElementById('admin-serie-filter')?.value || 'TAM';
  window._adminFinSerie = serieFilter;

  const {data} = await sb.from('finiture').select('*').eq('codice_serie',serieFilter).order('fascia').order('nome_finitura');
  const serieOpts=(serie||[]).map(s=>\`<option value="\${s.codice}" \${s.codice===serieFilter?'selected':''}>\${s.codice}</option>\`).join('');

  // Serie laccate che usano fascia e pct
  const isLaccata = isSerieLaccata(serieFilter);

  const rows=(data||[]).map(f=>\`<tr>
    <td>\${inlineInput(f.codice_finitura,\`adminSalva('finiture','\${f.id}','codice_finitura',this.value)\`,'60px','text')}</td>
    <td>\${inlineInput(f.nome_finitura,\`adminSalva('finiture','\${f.id}','nome_finitura',this.value)\`,'150px','text')}</td>
    <td>\${inlineInput(f.codice_modello||'',\`adminSalva('finiture','\${f.id}','codice_modello',this.value)\`,'70px','text','Tutti')}</td>
    \${isLaccata?\`<td>
      <select onchange="adminSalva('finiture','\${f.id}','fascia',this.value);window._adminFinSerie='\${serieFilter}';adminFiniture();"
        style="padding:3px 6px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:11px;font-family:inherit">
        <option value="" \${!f.fascia?'selected':''}>— nessuna —</option>
        <option value="LAMINATO" \${f.fascia==='LAMINATO'?'selected':''}>LAMINATO</option>
        <option value="MP CLASSIC" \${f.fascia==='MP CLASSIC'?'selected':''}>MP CLASSIC</option>
        <option value="MP LIGHT" \${f.fascia==='MP LIGHT'?'selected':''}>MP LIGHT</option>
        <option value="MP PREMIUM" \${f.fascia==='MP PREMIUM'?'selected':''}>MP PREMIUM</option>
      </select>
    </td>
    <td>\${inlineInput(f.sovrapprezzo_a??0,\`adminSalva('finiture','\${f.id}','sovrapprezzo_a',this.value)\`,'60px','number','€ fisso A')}</td>
    <td>\${inlineInput(f.sovrapprezzo_p??0,\`adminSalva('finiture','\${f.id}','sovrapprezzo_p',this.value)\`,'60px','number','€ fisso P')}</td>
    <td>\${inlineInput(f.sovrapprezzo_pct_a??0,\`adminSalva('finiture','\${f.id}','sovrapprezzo_pct_a',this.value)\`,'55px','number','% A')}</td>
    <td>\${inlineInput(f.sovrapprezzo_pct_p??0,\`adminSalva('finiture','\${f.id}','sovrapprezzo_pct_p',this.value)\`,'55px','number','% P')}</td>\`
    :\`<td>\${inlineInput(f.sovrapprezzo_a??0,\`adminSalva('finiture','\${f.id}','sovrapprezzo_a',this.value)\`,'65px','number')}</td>
    <td>\${inlineInput(f.sovrapprezzo_p??0,\`adminSalva('finiture','\${f.id}','sovrapprezzo_p',this.value)\`,'65px','number')}</td>\`}
    <td><span class="badge \${f.consente_bugna?'bg':'br'}" style="cursor:pointer" onclick="toggleCampo('finiture','\${f.id}','consente_bugna',\${f.consente_bugna})">\${f.consente_bugna?'Sì':'No'}</span></td>
    <td>\${inlineInput(f.sovrapprezzo_bugna_a??0,\`adminSalva('finiture','\${f.id}','sovrapprezzo_bugna_a',this.value)\`,'55px','number')}</td>
    <td>\${inlineInput(f.sovrapprezzo_bugna_p??0,\`adminSalva('finiture','\${f.id}','sovrapprezzo_bugna_p',this.value)\`,'55px','number')}</td>
    <td><span class="badge \${f.telaio_da_laccare?'bg':'br'}" style="cursor:pointer" onclick="toggleCampo('finiture','\${f.id}','telaio_da_laccare',\${!!f.telaio_da_laccare})">\${f.telaio_da_laccare?'Sì':'No'}</span></td>
    <td><span class="badge \${f.coprifili_da_laccare?'bg':'br'}" style="cursor:pointer" onclick="toggleCampo('finiture','\${f.id}','coprifili_da_laccare',\${!!f.coprifili_da_laccare})">\${f.coprifili_da_laccare?'Sì':'No'}</span></td>
    <td>\${adminToggle(f.attiva,\`toggleCampo('finiture','\${f.id}','attiva',\${f.attiva})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('finiture','\${f.id}','adminFiniture')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px" title="Elimina">×</button></td>
  </tr>\`).join('');

  const theadLaccata = isLaccata
    ? '<th>Fascia</th><th>Sovr.€ A</th><th>Sovr.€ P</th><th>Sovr.% A</th><th>Sovr.% P</th>'
    : '<th>Sovr.A</th><th>Sovr.P</th>';

  document.getElementById('admin-sub').innerHTML=\`
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
    <label style="font-size:12px;color:var(--mid)">Serie:</label>
    <select id="admin-serie-filter" onchange="window._adminFinSerie=this.value;adminFiniture()" style="padding:5px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit">\${serieOpts}</select>
    <span style="font-size:12px;color:var(--mid)">\${(data||[]).length} finiture</span>
    <button class="btn btn-red btn-sm" onclick="nuovaFinitura('\${serieFilter}')">+ Aggiungi finitura</button>
  </div>
  \${adminCard(\`Finiture — \${serieFilter}\`,\`<div style="overflow-x:auto"><table>
    <thead><tr><th>Codice</th><th>Nome</th><th>Modello</th>\${theadLaccata}<th>Bugna</th><th>Bugna A</th><th>Bugna P</th><th>Telaio lacc.</th><th>Coprif. lacc.</th><th>Stato</th><th></th></tr></thead>
    <tbody>\${rows}</tbody>
  </table></div>\`)}\`;
}

async function nuovaFinitura(serieFilter){
  const cod=prompt('Codice finitura:'); if(!cod) return;
  const nome=prompt('Nome finitura:'); if(!nome) return;
  const {error}=await sb.from('finiture').insert([{codice_serie:serieFilter,codice_finitura:cod.toUpperCase(),nome_finitura:nome,attiva:true}]);
  if(error){toast(msgErrore(error,cod),'err');return;}
  toast('Finitura aggiunta','ok'); adminFiniture();
}

// MISURE STANDARD
// Famiglie sempre presenti nel select misure (anche se vuote)
const MISURE_FAMIGLIE_EXTRA = ['SOP','PAS','PAN-BL'];
const MISURE_FAM_LABELS = {}; // codici mostrati as-is nel select e nella tabella

async function adminMisure(){
  const {data:famiglie} = await sb.from('misure_standard').select('famiglia_apertura').order('famiglia_apertura');
  const famSetDb = [...new Set((famiglie||[]).map(f=>f.famiglia_apertura))];
  const famSet = [...new Set([...famSetDb, ...MISURE_FAMIGLIE_EXTRA])].sort();
  const famFilter = window._adminMisureFam || famSet[0] || 'BAT';
  window._adminMisureFam = famFilter;

  const {data} = await sb.from('misure_standard').select('*').eq('famiglia_apertura',famFilter).order('larghezza_mm').order('altezza_mm');

  const famOpts = famSet.map(f=>\`<option value="\${f}" \${f===famFilter?'selected':''}>\${MISURE_FAM_LABELS[f]||f}</option>\`).join('');

  const rows=(data||[]).map(m=>\`<tr>
    <td>\${inlineInput(m.larghezza_mm,\`adminSalva('misure_standard','\${m.id}','larghezza_mm',this.value)\`,'70px','number')} mm</td>
    <td>\${inlineInput(m.altezza_mm,\`adminSalva('misure_standard','\${m.id}','altezza_mm',this.value)\`,'70px','number')} mm</td>
    <td style="font-size:12px;color:var(--mid)">\${m.famiglia_apertura}</td>
    <td>\${inlineInput(m.sovrapprezzo_a??0,\`adminSalva('misure_standard','\${m.id}','sovrapprezzo_a',this.value)\`,'65px','number','€ A')}</td>
    <td>\${inlineInput(m.sovrapprezzo_p??0,\`adminSalva('misure_standard','\${m.id}','sovrapprezzo_p',this.value)\`,'65px','number','€ P')}</td>
    <td>\${inlineInput(m.sovrapprezzo_pct_a??0,\`adminSalva('misure_standard','\${m.id}','sovrapprezzo_pct_a',this.value)\`,'55px','number','% A')}</td>
    <td>\${inlineInput(m.sovrapprezzo_pct_p??0,\`adminSalva('misure_standard','\${m.id}','sovrapprezzo_pct_p',this.value)\`,'55px','number','% P')}</td>
    <td><button onclick="eliminaRigaAdmin('misure_standard','\${m.id}','adminMisure')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');

  document.getElementById('admin-sub').innerHTML=\`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
      <label style="font-size:12px;color:var(--mid)">Famiglia:</label>
      <select onchange="window._adminMisureFam=this.value;adminMisure()" style="padding:5px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit">\${famOpts}</select>
    </div>
    \${adminCard(\`Misure standard — \${famFilter}\`,\`
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;padding-bottom:12px;border-bottom:0.5px solid var(--border);flex-wrap:wrap">
        <input type="number" id="nm-l" placeholder="Larghezza mm" style="padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:130px">
        <input type="number" id="nm-a" placeholder="Altezza mm (0=libera)" style="padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:160px">
        <button class="btn btn-red btn-sm" onclick="nuovaMisura('\${famFilter}')">+ Aggiungi</button>
      </div>
      <table><thead><tr><th>Larghezza (mm)</th><th>Altezza (mm)</th><th>Famiglia</th><th>Sovr.€ A</th><th>Sovr.€ P</th><th>Sovr.% A</th><th>Sovr.% P</th><th></th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:16px;font-style:italic">Nessuna misura — aggiungine una qui sopra</td></tr>'}</tbody>
    </table>\`)}\`;
}

async function nuovaMisura(fam){
  const l = document.getElementById('nm-l')?.value;
  const a = document.getElementById('nm-a')?.value;
  if(!l){toast('Inserisci la larghezza','err');return;}
  if(a===''||a===null||a===undefined){toast("Inserisci l'altezza (0 per libera)",'err');return;}
  const {error}=await sb.from('misure_standard').insert([{famiglia_apertura:fam,larghezza_mm:parseFloat(l),altezza_mm:parseFloat(a)}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Misura aggiunta','ok'); adminMisure();
}

// SUPPLEMENTI COM/FM
async function adminSupplementiComFm(){
  const {data:aperture} = await sb.from('tipologie_apertura').select('codice,nome')
    .in('famiglia',['COM','FM']).order('codice');
  const {data} = await sb.from('supplementi_apertura').select('*').order('codice_apertura').order('famiglia_serie');

  const famiglie = ['TAM_MAS','LACCATA','GREZZA'];
  const famLabel = {'TAM_MAS':'Tamburate + Massellate','LACCATA':'Laccate','GREZZA':'Grezze'};

  // Raggruppa per codice_apertura
  const byAp = {};
  (data||[]).forEach(r=>{ if(!byAp[r.codice_apertura]) byAp[r.codice_apertura]={}; byAp[r.codice_apertura][r.famiglia_serie]=r; });

  const rows=(aperture||[]).map(ap=>{
    return famiglie.map(fam=>{
      const r=byAp[ap.codice]?.[fam];
      return \`<tr>
        <td style="font-size:12px;font-weight:500">\${ap.codice}</td>
        <td style="font-size:12px;color:var(--mid)">\${ap.nome||''}</td>
        <td><span class="badge" style="background:var(--beige2);color:var(--dark);font-size:10px">\${famLabel[fam]}</span></td>
        <td>\${r?inlineInput(r.supplemento_a??0,\`adminSalvaSuppl('\${ap.codice}','\${fam}',\${r?\`'\${r.id}'\`:'null'},'supplemento_a',this.value)\`,'75px','number','€ A'):'<button class="btn btn-sm" onclick="creaSuppl(\\''+ap.codice+'\\',\\''+fam+'\\')">+ Crea</button>'}</td>
        <td>\${r?inlineInput(r.supplemento_p??0,\`adminSalvaSuppl('\${ap.codice}','\${fam}',\${r?\`'\${r.id}'\`:'null'},'supplemento_p',this.value)\`,'75px','number','€ P'):''}</td>
        <td style="font-size:11px;color:var(--mid)">\${r?.note||''}</td>
        \${r?\`<td><button onclick="eliminaRigaAdmin('supplementi_apertura','\${r.id}','adminSupplementiComFm')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>\`:'<td></td>'}
      </tr>\`;
    }).join('');
  }).join('');

  document.getElementById('admin-sub').innerHTML=adminCard('Supplementi COM/FM per famiglia serie',\`
    <div style="font-size:12px;color:var(--mid);margin-bottom:10px">
      Il supplemento viene applicato in base alla serie della porta configurata (TAM+MAS, Laccata o Grezza).
    </div>
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Codice</th><th>Nome</th><th>Famiglia</th><th>Suppl. A (€)</th><th>Suppl. P (€)</th><th>Note</th><th></th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="7" style="text-align:center;color:var(--mid);padding:16px">Nessun supplemento configurato</td></tr>'}</tbody>
    </table></div>\`);
}

async function creaSuppl(codAp, famSerie){
  const {error}=await sb.from('supplementi_apertura').insert([{codice_apertura:codAp,famiglia_serie:famSerie,supplemento_a:0,supplemento_p:0}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Riga creata — modifica i prezzi direttamente','ok'); adminSupplementiComFm();
}

async function adminSalvaSuppl(codAp, famSerie, id, campo, valore){
  const val=parseFloat(valore); if(isNaN(val)) return;
  if(id&&id!=='null'){
    await sb.from('supplementi_apertura').update({[campo]:val}).eq('id',id);
  } else {
    await sb.from('supplementi_apertura').insert([{codice_apertura:codAp,famiglia_serie:famSerie,[campo]:val}]);
  }
  toast('Salvato','ok');
}

// APERTURE E SENSI
async function adminAperture(){
  const [{data:ap},{data:sensi}] = await Promise.all([
    sb.from('tipologie_apertura').select('*').order('famiglia').order('codice'),
    sb.from('sensi_apertura').select('*').order('codice_apertura').order('ordine'),
  ]);

  const rows=(ap||[]).map(a=>{
    const sensiAp=(sensi||[]).filter(s=>s.codice_apertura===a.codice);
    const sensiHtml=sensiAp.map(s=>\`
      <span style="display:inline-flex;align-items:center;gap:2px;padding:1px 6px;border-radius:3px;font-size:10px;background:var(--blue-bg);color:var(--blue-tx);margin:1px">
        \${s.codice_senso}
        <span onclick="eliminaSenso('\${s.id}','\${a.codice}')" style="cursor:pointer;color:var(--mid);margin-left:2px;font-size:11px" title="Rimuovi">×</span>
      </span>\`).join('');
    const sp = a.logica_prezzo==='fisso'?inlineInput(a.sovrapprezzo_a??'',\`adminSalva('tipologie_apertura','\${a.id}','sovrapprezzo_a',this.value)\`,'65px'):
              a.logica_prezzo==='percentuale'?inlineInput(a.maggiorazione_pct??'',\`adminSalva('tipologie_apertura','\${a.id}','maggiorazione_pct',this.value)\`,'55px')+'%':'variabile';
    const spP = a.logica_prezzo==='fisso'?inlineInput(a.sovrapprezzo_p??'',\`adminSalva('tipologie_apertura','\${a.id}','sovrapprezzo_p',this.value)\`,'65px'):'—';
    return \`<tr>
      <td>\${inlineInput(a.codice,\`adminSalva('tipologie_apertura','\${a.id}','codice',this.value)\`,'80px','text')}</td>
      <td>\${inlineInput(a.nome||'',\`adminSalva('tipologie_apertura','\${a.id}','nome',this.value)\`,'180px','text')}</td>
      <td><select onchange="adminSalva('tipologie_apertura','\${a.id}','famiglia',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:11px">
        \${['BAT','CS','SI','SE','FM','COM','ROTO','LIBRO','SALOON','ROTOTRASLANTI','SPECIALI','PASSATE'].map(f=>\`<option value="\${f}" \${f===a.famiglia?'selected':''}>\${f}</option>\`).join('')}
      </select></td>
      <td><select onchange="adminSalva('tipologie_apertura','\${a.id}','logica_prezzo',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:11px">
        \${['fisso','spessore','percentuale','doppio'].map(l=>\`<option value="\${l}" \${l===a.logica_prezzo?'selected':''}>\${l}</option>\`).join('')}
      </select></td>
      <td>\${sp}</td><td>\${spP}</td>
      <td style="max-width:160px">
        \${sensiHtml||'<span style="font-size:11px;color:var(--mid)">Nessuno</span>'}
        <button onclick="aggiungiSenso('\${a.codice}')" style="background:none;border:0.5px solid var(--border);border-radius:3px;color:var(--red);cursor:pointer;font-size:10px;padding:1px 5px;margin-left:3px">+</button>
      </td>
      <td>\${adminToggle(a.attiva,\`toggleCampo('tipologie_apertura','\${a.id}','attiva',\${a.attiva})\`)}</td>
      <td><button onclick="eliminaRigaAdmin('tipologie_apertura','\${a.id}','adminAperture')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
    </tr>\`;
  }).join('');

  document.getElementById('admin-sub').innerHTML=adminCard('Tipologie apertura e sensi',\`
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Codice</th><th>Nome completo</th><th>Famiglia</th><th>Logica prezzo</th><th>Sovr.A</th><th>Sovr.P</th><th>Sensi (× per rimuovere, + per aggiungere)</th><th>Stato</th><th></th></tr></thead>
      <tbody>\${rows}</tbody>
    </table></div>\`,
    \`<button class="btn btn-red btn-sm" onclick="nuovaApertura()">+ Aggiungi tipologia</button>\`);
}

async function aggiungiSenso(codApertura){
  const cod=prompt(\`Codice senso per \${codApertura} (DX, SX, T.DX, T.SX, BIDIREZIONALE, X, NESSUNO):\`);
  if(!cod) return;
  const desc=prompt('Descrizione (es. Apertura SPINGERE DX):');
  const {error}=await sb.from('sensi_apertura').insert([{
    codice_apertura:codApertura, codice_senso:cod.toUpperCase(),
    famiglia:'BAT', descrizione_senso:desc||'', attivo:true, ordine:99
  }]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Senso aggiunto','ok'); adminAperture();
}

async function eliminaSenso(id, codApertura){
  if(!confirm('Rimuovere questo senso?')) return;
  await sb.from('sensi_apertura').delete().eq('id',id);
  toast('Senso rimosso','ok'); adminAperture();
}

async function nuovaApertura(){
  const cod=prompt('Codice apertura (es. BAT-NEW):'); if(!cod) return;
  const nome=prompt('Nome completo:'); if(!nome) return;
  const famiglia=prompt('Famiglia (BAT/SI/SE/FM/COM/ROTO/LIBRO/SALOON):'); if(!famiglia) return;
  const {error}=await sb.from('tipologie_apertura').insert([{codice:cod,nome,famiglia,logica_prezzo:'fisso',attiva:true}]);
  if(error){toast(msgErrore(error,cod),'err');return;}
  toast('Apertura aggiunta','ok'); adminAperture();
}

// FERRAMENTA
async function adminFerramenta(){
  const {data} = await sb.from('ferramenta').select('*').order('nome');
  const rows=(data||[]).map(f=>\`<tr>
    <td>\${inlineInput(f.codice,\`adminSalva('ferramenta','\${f.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(f.nome,\`adminSalva('ferramenta','\${f.id}','nome',this.value)\`,'160px','text')}</td>
    <td style="display:flex;align-items:center;gap:6px">
      \${f.colore_hex?\`<div style="width:24px;height:24px;border-radius:4px;background:#\${f.colore_hex};border:0.5px solid var(--border);flex-shrink:0"></div>\`:''}
      \${inlineInput(f.colore_hex||'',\`adminSalvaFerramenta('\${f.id}','colore_hex',this.value,this)\`,'80px','text','es. C0C0C0')}
    </td>
    <td>\${inlineInput(f.sovrapprezzo_a??0,\`adminSalva('ferramenta','\${f.id}','sovrapprezzo_a',this.value)\`,'65px')}</td>
    <td>\${inlineInput(f.sovrapprezzo_p??0,\`adminSalva('ferramenta','\${f.id}','sovrapprezzo_p',this.value)\`,'65px')}</td>
    <td>\${adminToggle(f.attivo,\`toggleCampo('ferramenta','\${f.id}','attivo',\${f.attivo})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('ferramenta','\${f.id}','adminFerramenta')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Ferramenta',\`
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Colore hex</th><th>Sovr.A (€)</th><th>Sovr.P (€)</th><th>Stato</th><th></th></tr></thead>
    <tbody>\${rows}</tbody></table>\`,
    \`<button class="btn btn-red btn-sm" onclick="nuovaConCodiceNome('ferramenta','Codice colore (es. NER-L):','Nome colore:',{attivo:true,sovrapprezzo_a:0,sovrapprezzo_p:0},'adminFerramenta')">+ Aggiungi colore</button>\`);
}

async function adminSalvaFerramenta(id, campo, valore, el){
  await adminSalva('ferramenta', id, campo, valore);
  // Aggiorna il pallino colore inline senza ricaricare tutta la tabella
  const preview = el.parentElement.querySelector('div[style*="border-radius:4px"]');
  if(preview && valore) preview.style.background='#'+valore;
}

// MANIGLIE
async function adminManiglie(){
  const {data} = await sb.from('maniglie').select('*').order('nome');
  const rows=(data||[]).map(m=>\`<tr>
    <td>\${inlineInput(m.codice,\`adminSalva('maniglie','\${m.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(m.nome,\`adminSalva('maniglie','\${m.id}','nome',this.value)\`,'160px','text')}</td>
    <td>\${inlineInput(m.serie_compatibili||'',\`adminSalva('maniglie','\${m.id}','serie_compatibili',this.value)\`,'100px','text','Tutte')}</td>
    <td style="max-width:180px">
      <div style="font-size:10px;color:var(--mid);margin-bottom:2px">Escludi aperture (cod. separati da virgola)</div>
      \${inlineInput(m.aperture_escluse||'',\`adminSalva('maniglie','\${m.id}','aperture_escluse',this.value)\`,'160px','text','es. LIBRO,SI')}
    </td>
    <td>\${inlineInput(m.descrizione||'',\`adminSalva('maniglie','\${m.id}','descrizione',this.value)\`,'150px','text','Descrizione')}</td>
    <td>\${inlineInput(m.prezzo_a??0,\`adminSalva('maniglie','\${m.id}','prezzo_a',this.value)\`,'65px')}</td>
    <td>\${inlineInput(m.prezzo_p??0,\`adminSalva('maniglie','\${m.id}','prezzo_p',this.value)\`,'65px')}</td>
    <td>
      \${m.immagine_url?\`<img src="\${m.immagine_url}" style="width:32px;height:32px;object-fit:cover;border-radius:4px;margin-right:4px">\`:''}
      <label style="cursor:pointer"><input type="file" accept="image/*" style="display:none" onchange="uploadImmagine('maniglie','\${m.id}',this)"><span style="font-size:11px;cursor:pointer;color:var(--red)">📷</span></label>
    </td>
    <td>\${adminToggle(m.attivo,\`toggleCampo('maniglie','\${m.id}','attivo',\${m.attivo})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('maniglie','\${m.id}','adminManiglie')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Maniglie',\`
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Codice</th><th>Nome</th><th>Serie compatibili</th><th>Aperture escluse</th><th>Descrizione</th><th>Prezzo A</th><th>Prezzo P</th><th>Immagine</th><th>Stato</th><th></th></tr></thead>
      <tbody>\${rows}</tbody></table></div>\`,
    \`<button class="btn btn-red btn-sm" onclick="nuovaConCodiceNome('maniglie','Codice maniglia (es. ASC-CH):','Nome maniglia:',{attivo:true,prezzo_a:0,prezzo_p:0},'adminManiglie')">+ Aggiungi maniglia</button>\`);
}

// ── SERRATURE ADMIN ───────────────────────────────────
async function adminSerrature(){
  const {data} = await sb.from('tipi_serratura').select('*').order('famiglie_apertura').order('codice');
  const rows=(data||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.codice,\`adminSalva('tipi_serratura','\${s.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(s.nome,\`adminSalva('tipi_serratura','\${s.id}','nome',this.value)\`,'180px','text')}</td>
    <td>\${inlineInput(s.famiglie_apertura||'',\`adminSalva('tipi_serratura','\${s.id}','famiglie_apertura',this.value)\`,'160px','text','es. BAT,CS,LIBRO')}</td>
    <td>\${inlineInput(s.descrizione||'',\`adminSalva('tipi_serratura','\${s.id}','descrizione',this.value)\`,'160px','text')}</td>
    <td><span style="cursor:pointer" onclick="toggleCampo('tipi_serratura','\${s.id}','richiede_cilindro',\${s.richiede_cilindro})">\${s.richiede_cilindro?'<span class="badge bg">Sì</span>':'<span class="badge br">No</span>'}</span></td>
    <td><span style="cursor:pointer" onclick="toggleCampo('tipi_serratura','\${s.id}','richiede_pomolino',\${s.richiede_pomolino})">\${s.richiede_pomolino?'<span class="badge bg">Sì</span>':'<span class="badge br">No</span>'}</span></td>
    <td><span style="cursor:pointer" onclick="toggleCampo('tipi_serratura','\${s.id}','is_automatica',\${s.is_automatica})">\${s.is_automatica?'<span class="badge bg">Sì</span>':'<span class="badge br">No</span>'}</span></td>
    <td>\${inlineInput(s.sovrapprezzo_a??0,\`adminSalva('tipi_serratura','\${s.id}','sovrapprezzo_a',this.value)\`,'65px')}</td>
    <td>\${inlineInput(s.sovrapprezzo_p??0,\`adminSalva('tipi_serratura','\${s.id}','sovrapprezzo_p',this.value)\`,'65px')}</td>
    <td>\${adminToggle(s.attiva,\`toggleCampo('tipi_serratura','\${s.id}','attiva',\${s.attiva})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('tipi_serratura','\${s.id}','adminSerrature')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Serrature',\`
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Codice</th><th>Nome</th><th>Famiglie apertura</th><th>Descrizione</th><th>Richiede cilindro</th><th>Richiede pomolino</th><th>Automatica</th><th>Sovr.A</th><th>Sovr.P</th><th>Stato</th><th></th></tr></thead>
      <tbody>\${rows}</tbody>
    </table></div>\`,
    \`<button class="btn btn-red btn-sm" onclick="nuovaSerratura()">+ Aggiungi serratura</button>\`);
}

// ── CILINDRI ADMIN ────────────────────────────────────
async function adminCilindri(){
  const {data} = await sb.from('tipi_cilindro').select('*').order('misura_mm');
  const rows=(data||[]).map(c=>\`<tr>
    <td>\${inlineInput(c.codice,\`adminSalva('tipi_cilindro','\${c.id}','codice',this.value)\`,'80px','text')}</td>
    <td>\${inlineInput(c.nome,\`adminSalva('tipi_cilindro','\${c.id}','nome',this.value)\`,'160px','text')}</td>
    <td>\${inlineInput(c.misura_mm||'',\`adminSalva('tipi_cilindro','\${c.id}','misura_mm',this.value)\`,'60px','number')} mm</td>
    <td>\${inlineInput(c.famiglie_apertura||'',\`adminSalva('tipi_cilindro','\${c.id}','famiglie_apertura',this.value)\`,'140px','text','es. BAT,CS')}</td>
    <td>\${inlineInput(c.fornitore||'',\`adminSalva('tipi_cilindro','\${c.id}','fornitore',this.value)\`,'100px','text')}</td>
    <td>\${inlineInput(c.sovrapprezzo_a??0,\`adminSalva('tipi_cilindro','\${c.id}','sovrapprezzo_a',this.value)\`,'65px')}</td>
    <td>\${inlineInput(c.sovrapprezzo_p??0,\`adminSalva('tipi_cilindro','\${c.id}','sovrapprezzo_p',this.value)\`,'65px')}</td>
    <td>\${adminToggle(c.attivo,\`toggleCampo('tipi_cilindro','\${c.id}','attivo',\${c.attivo})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('tipi_cilindro','\${c.id}','adminCilindri')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Cilindri',\`
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Misura</th><th>Famiglie apertura</th><th>Fornitore</th><th>Sovr.A</th><th>Sovr.P</th><th>Stato</th><th></th></tr></thead>
    <tbody>\${rows}</tbody></table>\`,
    \`<button class="btn btn-red btn-sm" onclick="nuovaConCodiceNome('tipi_cilindro','Codice cilindro (es. CIL-3535):','Nome cilindro:',{attivo:true,sovrapprezzo_a:0,sovrapprezzo_p:0},'adminCilindri')">+ Aggiungi cilindro</button>\`);
}

// ── COLORI MANIGLIA ADMIN ─────────────────────────────
async function adminColoriManiglia(){
  const {data:maniglie} = await sb.from('maniglie').select('codice,nome').eq('attivo',true).order('nome');
  const filtroMan = document.getElementById('admin-man-filter')?.value || maniglie?.[0]?.codice || '';
  const {data} = await sb.from('colori_maniglia').select('*').eq('codice_maniglia',filtroMan).order('nome_colore');

  const manOpts = (maniglie||[]).map(m=>\`<option value="\${m.codice}" \${m.codice===filtroMan?'selected':''}>\${m.codice} — \${m.nome}</option>\`).join('');

  const rows=(data||[]).map(c=>\`<tr>
    <td style="font-size:12px;color:var(--mid)">\${c.codice_maniglia}</td>
    <td>\${inlineInput(c.codice_colore,\`adminSalva('colori_maniglia','\${c.id}','codice_colore',this.value)\`,'80px','text')}</td>
    <td>\${inlineInput(c.nome_colore,\`adminSalva('colori_maniglia','\${c.id}','nome_colore',this.value)\`,'160px','text')}</td>
    <td style="display:flex;align-items:center;gap:6px">
      \${c.colore_hex?\`<div style="width:22px;height:22px;border-radius:4px;background:#\${c.colore_hex};border:0.5px solid var(--border)"></div>\`:''}
      \${inlineInput(c.colore_hex||'',\`adminSalva('colori_maniglia','\${c.id}','colore_hex',this.value)\`,'80px','text','es. C0C0C0')}
    </td>
    <td>\${inlineInput(c.prezzo_maniglia??0,\`adminSalva('colori_maniglia','\${c.id}','prezzo_maniglia',this.value)\`,'70px')}</td>
    <td>\${adminToggle(c.attivo,\`toggleCampo('colori_maniglia','\${c.id}','attivo',\${c.attivo})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('colori_maniglia','\${c.id}','adminColoriManiglia')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');

  document.getElementById('admin-sub').innerHTML=\`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <label style="font-size:12px;color:var(--mid)">Maniglia:</label>
      <select id="admin-man-filter" onchange="adminColoriManiglia()" style="padding:5px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit">\${manOpts}</select>
      <button class="btn btn-red btn-sm" onclick="nuovoColoreManiglia('\${filtroMan}')">+ Aggiungi colore</button>
    </div>
    \${adminCard('Colori maniglia',\`
      <table><thead><tr><th>Maniglia</th><th>Cod. colore</th><th>Nome colore</th><th>Colore hex</th><th>Prezzo</th><th>Stato</th><th></th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="7" style="text-align:center;color:var(--mid);padding:16px">Nessun colore</td></tr>'}</tbody>
    </table>\`)}\`;
}

async function nuovoColoreManiglia(codManiglia){
  const cod=prompt('Codice colore (es. CRS, CRL):'); if(!cod) return;
  const nome=prompt('Nome colore:'); if(!nome) return;
  const {error}=await sb.from('colori_maniglia').insert([{codice_maniglia:codManiglia,codice_colore:cod.toUpperCase(),nome_colore:nome,prezzo_maniglia:0,attivo:true}]);
  if(error){toast(msgErrore(error,cod),'err');return;}
  toast('Colore aggiunto','ok'); adminColoriManiglia();
}

// ── POMOLINI WC ADMIN ─────────────────────────────────
async function adminPomolini(){
  const {data} = await sb.from('pomolini_wc').select('*').order('nome');
  const rows=(data||[]).map(p=>\`<tr>
    <td>\${inlineInput(p.codice,\`adminSalva('pomolini_wc','\${p.id}','codice',this.value)\`,'80px','text')}</td>
    <td>\${inlineInput(p.nome,\`adminSalva('pomolini_wc','\${p.id}','nome',this.value)\`,'160px','text')}</td>
    <td>\${inlineInput(p.descrizione||'',\`adminSalva('pomolini_wc','\${p.id}','descrizione',this.value)\`,'180px','text')}</td>
    <td style="display:flex;align-items:center;gap:6px">
      \${p.colore_hex?\`<div style="width:22px;height:22px;border-radius:4px;background:#\${p.colore_hex};border:0.5px solid var(--border)"></div>\`:''}
      \${inlineInput(p.colore_hex||'',\`adminSalva('pomolini_wc','\${p.id}','colore_hex',this.value)\`,'80px','text')}
    </td>
    <td>\${inlineInput(p.prezzo_a??0,\`adminSalva('pomolini_wc','\${p.id}','prezzo_a',this.value)\`,'65px')}</td>
    <td>\${inlineInput(p.prezzo_p??0,\`adminSalva('pomolini_wc','\${p.id}','prezzo_p',this.value)\`,'65px')}</td>
    <td>\${adminToggle(p.attivo,\`toggleCampo('pomolini_wc','\${p.id}','attivo',\${p.attivo})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('pomolini_wc','\${p.id}','adminPomolini')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Pomolini WC',\`
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Descrizione</th><th>Colore hex</th><th>Prezzo A</th><th>Prezzo P</th><th>Stato</th><th></th></tr></thead>
    <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:16px">Nessun pomolino</td></tr>'}</tbody></table>\`,
    \`<button class="btn btn-red btn-sm" onclick="nuovaConCodiceNome('pomolini_wc','Codice pomolino (es. POM-WC-T):','Nome pomolino:',{attivo:true,prezzo_a:0,prezzo_p:0},'adminPomolini')">+ Aggiungi pomolino</button>\`);
}


async function nuovaConCodiceNome(tabella, promptCodice, promptNome, extraData, callback){
  const codice = prompt(promptCodice);
  if(!codice) return;
  const nome = prompt(promptNome);
  if(!nome) return;
  // Inserisce solo codice e nome — gli altri campi si modificano inline
  const {data, error} = await sb.from(tabella).insert([{codice:codice.trim(), nome}]).select();
  if(error){
    console.error('nuovaConCodiceNome error:', error);
    toast('Errore: '+error.message,'err');
    return;
  }
  toast('Aggiunto — modifica gli altri campi direttamente in tabella','ok');
  if(callback && window[callback]) window[callback]();
}

async function nuovaSerratura(){
  const codice = prompt('Codice serratura (es. PAT, YALE, WC, L-O):');
  if(!codice) return;
  const nome = prompt('Nome serratura:');
  if(!nome) return;
  const {data, error} = await sb.from('tipi_serratura').insert([{
    codice:codice.toUpperCase().trim(), nome,
    attiva:true, richiede_cilindro:false,
    richiede_pomolino:false
  }]).select();
  if(error){
    console.error('nuovaSerratura error:', error);
    toast('Errore: '+error.message,'err');
    return;
  }
  toast('Serratura aggiunta — modifica i campi direttamente in tabella','ok');
  adminSerrature();
}

async function eliminaRigaAdmin(tabella, id, callback){
  if(!confirm('Eliminare questa riga? L\\'operazione non è reversibile.')) return;
  const {error} = await sb.from(tabella).delete().eq('id',id);
  if(error){toast('Errore eliminazione: '+error.message,'err');return;}
  toast('Eliminato','ok');
  if(callback && window[callback]) window[callback]();
}

// ══════════════════════════════════════════════════════
// PREZZI E LISTINI
// ══════════════════════════════════════════════════════
function adminPrezzi(){
  const tabs=[{id:'listini',label:'Listini A e P'},{id:'colori_extra',label:'Vetro e inserti'},{id:'scontistiche',label:'Scontistiche'}];
  document.getElementById('admin-main').innerHTML=adminSubTabs(tabs,'listini','switchAdminPrezzi')+'<div id="admin-sub"></div>';
  switchAdminPrezzi('listini');
}
function switchAdminPrezzi(sub){
  adminSub=sub;
  document.querySelectorAll('#admin-main [onclick^="switchAdminPrezzi"]').forEach(t=>{
    const isActive=t.getAttribute('onclick').includes(\`'\${sub}'\`);
    t.style.borderBottom=isActive?'2px solid var(--red)':'2px solid transparent';
    t.style.color=isActive?'var(--red)':'var(--mid)'; t.style.fontWeight=isActive?'500':'400';
  });
  if(sub==='listini') adminListini();
  else if(sub==='colori_extra') adminColoriExtra();
  else if(sub==='scontistiche') adminScontistiche();
}

async function adminListini(){
  const {data:modelli} = await sb.from('modelli').select('*,prezzi_modello(listino,prezzo_base,prezzo_vetro,vetro_incluso,ha_extra_incisioni,prezzo_extra_incisioni)').order('codice_serie').order('nome');
  const rows=(modelli||[]).map(m=>{
    const pa=m.prezzi_modello?.find(p=>p.listino==='A');
    const pp=m.prezzi_modello?.find(p=>p.listino==='P');
    return \`<tr>
      <td><span class="tag" style="font-size:10px">\${m.codice_serie}</span></td>
      <td><strong style="font-size:12px">\${m.codice}</strong></td>
      <td style="font-size:12px">\${m.nome}</td>
      <td>\${inlineInput(pa?.prezzo_base||'',\`salvaPrezzo('\${m.codice}','A','prezzo_base',this.value)\`,'75px')}</td>
      <td>\${inlineInput(pp?.prezzo_base||'',\`salvaPrezzo('\${m.codice}','P','prezzo_base',this.value)\`,'75px')}</td>
      <td>\${m.ha_vetro&&!pa?.vetro_incluso?inlineInput(pa?.prezzo_vetro||'',\`salvaPrezzo('\${m.codice}','A','prezzo_vetro',this.value)\`,'70px'):m.ha_vetro?'<span class="badge bg" style="font-size:10px">Incl.</span>':'—'}</td>
      <td>\${m.ha_vetro&&!pp?.vetro_incluso?inlineInput(pp?.prezzo_vetro||'',\`salvaPrezzo('\${m.codice}','P','prezzo_vetro',this.value)\`,'70px'):'—'}</td>
      <td>\${pa?.ha_extra_incisioni?inlineInput(pa?.prezzo_extra_incisioni||'',\`salvaPrezzo('\${m.codice}','A','prezzo_extra_incisioni',this.value)\`,'70px'):'—'}</td>
      <td>\${adminToggle(m.attivo,\`toggleCampo('modelli','\${m.id}','attivo',\${m.attivo})\`)}</td>
    </tr>\`;
  }).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Listini A e P — prezzi base e vetro',\`
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Serie</th><th>Codice</th><th>Modello</th><th>Base A (€)</th><th>Base P (€)</th><th>Vetro A</th><th>Vetro P</th><th>Incis. A</th><th>Stato</th></tr></thead>
      <tbody>\${rows}</tbody>
    </table></div>\`);
}

async function adminColoriExtra(){
  const [{data:tv},{data:alu},{data:pietra}] = await Promise.all([
    sb.from('tipi_vetro').select('*').order('nome'),
    sb.from('colori_inserto_alluminio').select('*').order('nome'),
    sb.from('colori_pietra').select('*').order('nome'),
  ]);
  const rowsV=(tv||[]).map(v=>\`<tr>
    <td>\${inlineInput(v.codice,\`adminSalva('tipi_vetro','\${v.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(v.nome,\`adminSalva('tipi_vetro','\${v.id}','nome',this.value)\`,'150px','text')}</td>
    <td>\${inlineInput(v.sovrapprezzo_a??0,\`adminSalva('tipi_vetro','\${v.id}','sovrapprezzo_a',this.value)\`,'65px')}</td>
    <td>\${inlineInput(v.sovrapprezzo_p??0,\`adminSalva('tipi_vetro','\${v.id}','sovrapprezzo_p',this.value)\`,'65px')}</td>
    <td>\${adminToggle(v.attivo,\`toggleCampo('tipi_vetro','\${v.id}','attivo',\${v.attivo})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('tipi_vetro','\${v.id}','adminColoriExtra')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  const rowsA=(alu||[]).map(a=>\`<tr>
    <td>\${inlineInput(a.codice,\`adminSalva('colori_inserto_alluminio','\${a.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(a.nome,\`adminSalva('colori_inserto_alluminio','\${a.id}','nome',this.value)\`,'150px','text')}</td>
    <td><span class="badge \${a.incluso?'bg':'ba'}" style="cursor:pointer;font-size:10px" onclick="toggleCampo('colori_inserto_alluminio','\${a.id}','incluso',\${a.incluso})">\${a.incluso?'Incluso':'A pagamento'}</span></td>
    <td>\${inlineInput(a.sovrapprezzo_a??'',\`adminSalva('colori_inserto_alluminio','\${a.id}','sovrapprezzo_a',this.value)\`,'65px','number','0')}</td>
    <td>\${inlineInput(a.sovrapprezzo_p??'',\`adminSalva('colori_inserto_alluminio','\${a.id}','sovrapprezzo_p',this.value)\`,'65px','number','0')}</td>
    <td><button onclick="eliminaRigaAdmin('colori_inserto_alluminio','\${a.id}','adminColoriExtra')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  const rowsP=(pietra||[]).map(p=>\`<tr>
    <td>\${inlineInput(p.codice,\`adminSalva('colori_pietra','\${p.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(p.nome,\`adminSalva('colori_pietra','\${p.id}','nome',this.value)\`,'150px','text')}</td>
    <td>\${inlineInput(p.sovrapprezzo_a??0,\`adminSalva('colori_pietra','\${p.id}','sovrapprezzo_a',this.value)\`,'65px')}</td>
    <td>\${inlineInput(p.sovrapprezzo_p??0,\`adminSalva('colori_pietra','\${p.id}','sovrapprezzo_p',this.value)\`,'65px')}</td>
    <td><button onclick="eliminaRigaAdmin('colori_pietra','\${p.id}','adminColoriExtra')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=\`
  <div class="card" style="margin-bottom:12px">
    <div class="card-header"><span class="card-title">Tipi vetro</span><button class="btn btn-red btn-sm" onclick="nuovaRigaUpsert('tipi_vetro',{codice:'VET'+Date.now().toString().slice(-3),nome:'Nuovo vetro',sovrapprezzo_a:0,sovrapprezzo_p:0,attivo:true},'adminColoriExtra')">+</button></div>
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Sovr.A</th><th>Sovr.P</th><th>Stato</th><th></th></tr></thead><tbody>\${rowsV||'<tr><td colspan="5" style="text-align:center;color:var(--mid);padding:12px">Nessuno</td></tr>'}</tbody></table>
  </div>
  <div class="card" style="margin-bottom:12px">
    <div class="card-header"><span class="card-title">Colori inserto alluminio</span><button class="btn btn-red btn-sm" onclick="nuovaRiga('colori_inserto_alluminio',{codice:'ALU'+Date.now().toString().slice(-4),nome:'Nuovo colore',incluso:false},'adminColoriExtra')">+</button></div>
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Incluso</th><th>Sovr.A</th><th>Sovr.P</th><th></th></tr></thead><tbody>\${rowsA||'<tr><td colspan="5" style="text-align:center;color:var(--mid);padding:12px">Nessuno</td></tr>'}</tbody></table>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Colori pietra</span><button class="btn btn-red btn-sm" onclick="nuovaRiga('colori_pietra',{codice:'PIE'+Date.now().toString().slice(-4),nome:'Nuovo colore',sovrapprezzo_a:0,sovrapprezzo_p:0},'adminColoriExtra')">+</button></div>
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Sovr.A</th><th>Sovr.P</th></tr></thead><tbody>\${rowsP||'<tr><td colspan="4" style="text-align:center;color:var(--mid);padding:12px">Nessun colore pietra — aggiungilo qui</td></tr>'}</tbody></table>
  </div>\`;
}

async function adminScontistiche(){
  const {data} = await sb.from('scontistiche').select('*').order('canale');
  const canali=['rivenditore','architetto','impresa','privato'];
  const rows=(data||[]).map(s=>\`<tr>
    <td><select onchange="adminSalva('scontistiche','\${s.id}','canale',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:12px">
      \${canali.map(c=>\`<option value="\${c}" \${c===s.canale?'selected':''}>\${c}</option>\`).join('')}
    </select></td>
    <td><span class="tag">\${s.listino||'—'}</span></td>
    <td>\${inlineInput(s.sconto_base_pct??'',\`adminSalva('scontistiche','\${s.id}','sconto_base_pct',this.value)\`,'60px')} %</td>
    <td>\${inlineInput(s.sconto_max_pct??'',\`adminSalva('scontistiche','\${s.id}','sconto_max_pct',this.value)\`,'60px')} %</td>
    <td style="font-size:12px;color:var(--mid);max-width:200px">\${s.note||''}</td>
    <td>\${adminToggle(s.attivo!==false,\`toggleCampo('scontistiche','\${s.id}','attivo',\${s.attivo!==false})\`)}</td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Scontistiche per canale',\`
    <table><thead><tr><th>Canale</th><th>Listino</th><th>Sconto base %</th><th>Sconto max %</th><th>Note</th><th>Stato</th></tr></thead>
    <tbody>\${rows||'<tr><td colspan="6" style="text-align:center;color:var(--mid);padding:12px">Nessuna scontistica</td></tr>'}</tbody></table>\`);
}

// ══════════════════════════════════════════════════════
// TELAIO E COMPONENTI
// ══════════════════════════════════════════════════════
function adminTelaioPanel(){
  const tabs=[{id:'spalle',label:'Spalle telaio'},{id:'regole',label:'Regole spessore'},
    {id:'scorrevoli_ext',label:'Scorrevoli esterni'},{id:'scorrevoli_int',label:'Scorrevoli interni'},
    {id:'coprifili',label:'Set coprifili'}];
  document.getElementById('admin-main').innerHTML=adminSubTabs(tabs,'spalle','switchAdminTelaio')+'<div id="admin-sub"></div>';
  switchAdminTelaio('spalle');
}
function switchAdminTelaio(sub){
  adminSub=sub;
  document.querySelectorAll('#admin-main [onclick^="switchAdminTelaio"]').forEach(t=>{
    const isActive=t.getAttribute('onclick').includes(\`'\${sub}'\`);
    t.style.borderBottom=isActive?'2px solid var(--red)':'2px solid transparent';
    t.style.color=isActive?'var(--red)':'var(--mid)'; t.style.fontWeight=isActive?'500':'400';
  });
  if(sub==='spalle') adminSpalle();
  else if(sub==='regole') adminRegole();
  else if(sub==='scorrevoli_ext') adminScorExt();
  else if(sub==='scorrevoli_int') adminScorInt();
  else if(sub==='coprifili') adminCoprifiliSet();
}

async function adminSpalle(){
  const {data} = await sb.from('telai_spalle').select('*').order('famiglia_apertura').order('spalla_cm');
  const rows=(data||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.codice,\`adminSalva('telai_spalle','\${s.id}','codice',this.value)\`,'90px','text')}</td>
    <td>\${inlineInput(s.spalla_cm,\`adminSalva('telai_spalle','\${s.id}','spalla_cm',this.value)\`,'60px','number')} mm</td>
    <td>\${inlineInput(s.famiglia_apertura||'',\`adminSalva('telai_spalle','\${s.id}','famiglia_apertura',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(s.descrizione||'',\`adminSalva('telai_spalle','\${s.id}','descrizione',this.value)\`,'160px','text','—')}</td>
    <td>\${inlineInput(s.prezzo_a??'',\`adminSalva('telai_spalle','\${s.id}','prezzo_a',this.value)\`,'70px','number','€')}</td>
    <td>\${inlineInput(s.prezzo_p??'',\`adminSalva('telai_spalle','\${s.id}','prezzo_p',this.value)\`,'70px','number','€')}</td>
    <td><button onclick="eliminaRigaAdmin('telai_spalle','\${s.id}','adminSpalle')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Spalle telaio a magazzino',\`
    <div style="margin-bottom:10px"><button class="btn btn-red btn-sm" onclick="nuovaSpalla()">+ Aggiungi spalla</button></div>
    <table><thead><tr><th>Codice</th><th>Spalla (mm)</th><th>Famiglia</th><th>Descrizione</th><th>Prezzo A (€)</th><th>Prezzo P (€)</th><th></th></tr></thead>
    <tbody>\${rows}</tbody></table>\`);
}

async function nuovaSpalla(){
  const cod=prompt('Codice spalla (es. 107_B32):'); if(!cod) return;
  const mm=prompt('Misura mm:'); if(!mm) return;
  const fam=prompt('Famiglia apertura (es. BAT):'); if(!fam) return;
  const {error}=await sb.from('telai_spalle').insert([{codice:cod,spalla_cm:parseFloat(mm),famiglia_apertura:fam.toUpperCase()}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Spalla aggiunta','ok'); adminSpalle();
}

async function adminRegole(){
  const {data} = await sb.from('regole_telaio').select('*').order('famiglia_apertura').order('spessore_da_cm');
  const rows=(data||[]).map(r=>\`<tr>
    <td>\${inlineInput(r.famiglia_apertura,\`adminSalva('regole_telaio','\${r.id}','famiglia_apertura',this.value)\`,'70px','text')}</td>
    <td style="display:flex;gap:4px;align-items:center">
      \${inlineInput(r.spessore_da_cm,\`adminSalva('regole_telaio','\${r.id}','spessore_da_cm',this.value)\`,'55px','number')}
      <span style="font-size:11px;color:var(--mid)">–</span>
      \${inlineInput(r.spessore_a_cm,\`adminSalva('regole_telaio','\${r.id}','spessore_a_cm',this.value)\`,'55px','number')}
      <span style="font-size:11px;color:var(--mid)">mm</span>
    </td>
    <td>\${inlineInput(r.codice_spalla,\`adminSalva('regole_telaio','\${r.id}','codice_spalla',this.value)\`,'90px','text')}</td>
    <td>\${inlineInput(r.tipo_accessorio||'',\`adminSalva('regole_telaio','\${r.id}','tipo_accessorio',this.value)\`,'90px','text','—')}</td>
    <td>\${inlineInput(r.cm_accessorio||'',\`adminSalva('regole_telaio','\${r.id}','cm_accessorio',this.value)\`,'55px','number','—')}</td>
    <td>\${inlineInput(r.prezzo_access_A??'',\`adminSalva('regole_telaio','\${r.id}','prezzo_access_A',this.value)\`,'70px','number','€')}</td>
    <td>\${inlineInput(r.prezzo_access_P??'',\`adminSalva('regole_telaio','\${r.id}','prezzo_access_P',this.value)\`,'70px','number','€')}</td>
    <td>\${inlineInput(r.note||'',\`adminSalva('regole_telaio','\${r.id}','note',this.value)\`,'120px','text','—')}</td>
    <td><button onclick="eliminaRigaAdmin('regole_telaio','\${r.id}','adminRegole')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Regole abbinamento spessore → telaio',\`
    <div style="margin-bottom:10px"><button class="btn btn-red btn-sm" onclick="nuovaRegola()">+ Aggiungi regola</button></div>
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Famiglia</th><th>Spessore (mm)</th><th>Spalla</th><th>Accessorio</th><th>Mm</th><th>Costo A (€)</th><th>Costo P (€)</th><th>Note</th><th></th></tr></thead>
      <tbody>\${rows}</tbody>
    </table></div>\`);
}

async function nuovaRegola(){
  const fam=prompt('Famiglia apertura (es. BAT):'); if(!fam) return;
  const da=prompt('Spessore da (mm):'); if(!da) return;
  const a=prompt('Spessore a (mm):'); if(!a) return;
  const spalla=prompt('Codice spalla (es. 107_B32):'); if(!spalla) return;
  const {error}=await sb.from('regole_telaio').insert([{famiglia_apertura:fam.toUpperCase(),spessore_da_cm:parseFloat(da),spessore_a_cm:parseFloat(a),codice_spalla:spalla}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Regola aggiunta','ok'); adminRegole();
}

async function adminScorExt(){
  const {data} = await sb.from('scorrevoli_esterni').select('*').order('codice_apertura').order('spessore_da_cm');
  const rows=(data||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.codice_apertura,\`adminSalva('scorrevoli_esterni','\${s.id}','codice_apertura',this.value)\`,'80px','text')}</td>
    <td style="display:flex;gap:4px;align-items:center">
      \${inlineInput(s.spessore_da_cm,\`adminSalva('scorrevoli_esterni','\${s.id}','spessore_da_cm',this.value)\`,'55px','number')}
      <span style="font-size:11px;color:var(--mid)">–</span>
      \${inlineInput(s.spessore_a_cm,\`adminSalva('scorrevoli_esterni','\${s.id}','spessore_a_cm',this.value)\`,'55px','number')}
      <span style="font-size:11px;color:var(--mid)">mm</span>
    </td>
    <td>\${inlineInput(s.tipo_accessorio||'',\`adminSalva('scorrevoli_esterni','\${s.id}','tipo_accessorio',this.value)\`,'90px','text','—')}</td>
    <td>\${inlineInput(s.cm_accessorio||'',\`adminSalva('scorrevoli_esterni','\${s.id}','cm_accessorio',this.value)\`,'55px','number','mm')}</td>
    <td>\${inlineInput(s.prezzo_a??'',\`adminSalva('scorrevoli_esterni','\${s.id}','prezzo_a',this.value)\`,'75px','number','€')}</td>
    <td>\${inlineInput(s.prezzo_p??'',\`adminSalva('scorrevoli_esterni','\${s.id}','prezzo_p',this.value)\`,'75px','number','€')}</td>
    <td><button onclick="eliminaRigaAdmin('scorrevoli_esterni','\${s.id}','adminScorExt')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Scorrevoli esterni — prezzi per fascia spessore',\`
    <div style="margin-bottom:10px"><button class="btn btn-red btn-sm" onclick="nuovoScorExt()">+ Aggiungi</button></div>
    <table><thead><tr><th>Tipologia</th><th>Spessore muro (mm)</th><th>Accessorio</th><th>Mm</th><th>Prezzo A (€)</th><th>Prezzo P (€)</th><th></th></tr></thead>
    <tbody>\${rows}</tbody></table>\`);
}

async function nuovoScorExt(){
  const cod=prompt('Codice apertura (es. SE):'); if(!cod) return;
  const da=prompt('Spessore da (mm):'); if(!da) return;
  const a=prompt('Spessore a (mm):'); if(!a) return;
  const {error}=await sb.from('scorrevoli_esterni').insert([{codice_apertura:cod.toUpperCase(),spessore_da_cm:parseFloat(da),spessore_a_cm:parseFloat(a)}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Riga aggiunta','ok'); adminScorExt();
}

async function adminScorInt(){
  const {data} = await sb.from('scorrevoli_interni').select('*').order('codice_apertura').order('spalla_cassone_cm');
  const rows=(data||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.codice_apertura,\`adminSalva('scorrevoli_interni','\${s.id}','codice_apertura',this.value)\`,'80px','text')}</td>
    <td>\${inlineInput(s.codice_cassone||'',\`adminSalva('scorrevoli_interni','\${s.id}','codice_cassone',this.value)\`,'90px','text')}</td>
    <td>\${inlineInput(s.spalla_cassone_cm,\`adminSalva('scorrevoli_interni','\${s.id}','spalla_cassone_cm',this.value)\`,'65px','number')} mm</td>
    <td>\${inlineInput(s.kit_telaio_codice||'',\`adminSalva('scorrevoli_interni','\${s.id}','kit_telaio_codice',this.value)\`,'90px','text')}</td>
    <td>\${inlineInput(s.prezzo_a??'',\`adminSalva('scorrevoli_interni','\${s.id}','prezzo_a',this.value)\`,'75px','number','€')}</td>
    <td>\${inlineInput(s.prezzo_p??'',\`adminSalva('scorrevoli_interni','\${s.id}','prezzo_p',this.value)\`,'75px','number','€')}</td>
    <td><button onclick="eliminaRigaAdmin('scorrevoli_interni','\${s.id}','adminScorInt')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Scorrevoli interni — kit cassone',\`
    <div style="margin-bottom:10px"><button class="btn btn-red btn-sm" onclick="nuovoScorInt()">+ Aggiungi</button></div>
    <table><thead><tr><th>Tipologia</th><th>Cassone</th><th>Spalla (mm)</th><th>Kit telaio</th><th>Prezzo A (€)</th><th>Prezzo P (€)</th><th></th></tr></thead>
    <tbody>\${rows}</tbody></table>\`);
}

async function nuovoScorInt(){
  const cod=prompt('Codice apertura (es. SI):'); if(!cod) return;
  const {error}=await sb.from('scorrevoli_interni').insert([{codice_apertura:cod.toUpperCase()}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Riga aggiunta','ok'); adminScorInt();
}

// ── Set coprifili per tipologia di apertura ──────────────
// Un set per apertura: larghezza profilo (65/90) + n. aste (default 5).
// Colore e lunghezza (2250/3000) si risolvono allo scarico dalla finitura
// telaio della porta e dalla presenza del sopraluce.
const COPRIFILO_LARGHEZZE = [65, 90];
async function adminCoprifiliSet(){
  const [{data:aperture},{data:sets}] = await Promise.all([
    sb.from('tipologie_apertura').select('codice,nome').order('codice'),
    sb.from('coprifili_set').select('*'),
  ]);
  const apt=aperture||[];
  // indicizza: una riga per apertura (se ce ne fossero più, prendo la prima)
  const byApt={};
  (sets||[]).forEach(s=>{ if(!byApt[s.codice_apertura]) byApt[s.codice_apertura]=s; });
  const nDef=Object.keys(byApt).filter(k=>byApt[k].larghezza_mm).length;

  const rows=apt.map(a=>{
    const s=byApt[a.codice];
    const id=s?s.id:'';
    const larg=s?s.larghezza_mm:null;
    const largOpts=COPRIFILO_LARGHEZZE.map(w=>\`<option value="\${w}" \${larg==w?'selected':''}>\${w} mm</option>\`).join('');
    const attivo = s? (s.attivo!==false) : true;
    return \`<tr>
      <td style="white-space:nowrap"><span style="font-family:monospace;font-size:11px;color:var(--mid)">\${a.codice}</span> \${a.nome}</td>
      <td><select onchange="salvaCoprifiloApertura('\${a.codice}','larghezza_mm',this.value)" style="padding:4px 8px;border:0.5px solid var(--border);border-radius:4px;font-size:12px;font-family:inherit">
        <option value="" \${!larg?'selected':''}>—</option>\${largOpts}</select></td>
      <td><input type="number" value="\${s&&s.aste!=null?s.aste:5}" min="0" step="0.5" onchange="salvaCoprifiloApertura('\${a.codice}','aste',this.value)" style="width:60px;padding:4px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:12px"> aste</td>
      <td><input type="number" value="\${s&&s.supplemento!=null?s.supplemento:0}" min="0" step="0.01" onchange="salvaCoprifiloApertura('\${a.codice}','supplemento',this.value)" style="width:70px;padding:4px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:12px"> €</td>
      <td style="text-align:center"><input type="checkbox" \${attivo?'checked':''} onchange="salvaCoprifiloApertura('\${a.codice}','attivo',this.checked)" style="width:16px;height:16px;cursor:pointer;accent-color:var(--red)" title="Coprifili previsti per questa apertura"></td>
    </tr>\`;
  }).join('');

  document.getElementById('admin-sub').innerHTML=\`
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">
    <span style="font-size:11px;color:var(--mid)">\${nDef}/\${apt.length} aperture con larghezza definita</span>
  </div>
  \${adminCard('Set coprifili — standard per tipologia di apertura',\`
    <div style="background:var(--blue-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--blue-tx);margin-bottom:12px">
      Per ogni apertura imposta la <b>larghezza</b> del profilo coprifilo (uguale sui due lati) e il <b>numero di aste</b> (standard 5 = 2,5+2,5). Il <b>colore</b> segue la finitura telaio della porta e la <b>lunghezza</b> (2250/3000) si sceglie in base al sopraluce: entrambi si risolvono automaticamente allo scarico del magazzino, quindi qui non vanno indicati. I coprifili standard sono compresi nel prezzo della porta; usa "Supplemento" solo se questa apertura comporta un costo extra. Togli la spunta "Previsti" per le aperture senza coprifili.
    </div>
    <table><thead><tr><th>Tipologia apertura</th><th>Larghezza profilo</th><th>N. aste</th><th>Supplemento</th><th>Previsti</th></tr></thead>
    <tbody>\${rows}</tbody></table>\`)}\`;
}

// Upsert per apertura: crea la riga se non esiste, poi salva il campo.
async function salvaCoprifiloApertura(apertura, campo, valore){
  let val = valore;
  if(campo==='larghezza_mm'){ val = valore===''? null : parseInt(valore); }
  else if(campo==='aste'||campo==='supplemento'){ val = valore===''? (campo==='aste'?5:0) : parseFloat(valore); if(isNaN(val)) return; }
  // attivo resta booleano
  const {data:esist} = await sb.from('coprifili_set').select('id').eq('codice_apertura',apertura).limit(1);
  if(esist && esist.length){
    const {error}=await sb.from('coprifili_set').update({[campo]:val}).eq('id',esist[0].id);
    if(error){toast('Errore: '+error.message,'err');return;}
  } else {
    const base={codice_apertura:apertura, larghezza_mm:null, aste:5, supplemento:0, attivo:true};
    base[campo]=val;
    const {error}=await sb.from('coprifili_set').insert([base]);
    if(error){toast('Errore: '+error.message,'err');return;}
  }
  toast('Salvato','ok');
}

// ══════════════════════════════════════════════════════
// DISTINTE BASE
// ══════════════════════════════════════════════════════
async function adminDistinteMain(){
  var sub=adminSub||'base';
  var tabs=[{id:'base',label:'Distinte base'},{id:'regole',label:'Regole dinamiche'}];
  document.getElementById('admin-main').innerHTML=adminSubTabs(tabs,sub,'switchDistinteSub')+'<div id="distinte-sub"></div>';
  if(sub==='base') adminDistinte();
  else if(sub==='regole') adminDistinteRegole();
}

function switchDistinteSub(sub){
  adminSub=sub;adminDistinteMain();
}

async function adminDistinte(){
  const [{data:modelli},{data:serie}] = await Promise.all([
    sb.from('modelli').select('codice,nome,codice_serie').eq('attivo',true).order('codice_serie').order('nome'),
    sb.from('serie').select('codice,nome').order('nome'),
  ]);
  const filtroSerie = document.getElementById('db-serie-filter')?.value||'TAM';
  const filtroModello = document.getElementById('db-modello-filter')?.value||modelli?.[0]?.codice||'';
  const serieOpts=(serie||[]).map(s=>\`<option value="\${s.codice}" \${s.codice===filtroSerie?'selected':''}>\${s.codice}</option>\`).join('');
  const modelliSerie=(modelli||[]).filter(m=>m.codice_serie===filtroSerie);
  const modelloOpts=modelliSerie.map(m=>\`<option value="\${m.codice}" \${m.codice===filtroModello?'selected':''}>\${m.codice} — \${m.nome}</option>\`).join('');

  let rowsDB='';
  if(filtroModello){
    const {data:db} = await sb.from('distinte_base').select('*').eq('codice_modello',filtroModello).eq('attivo',true).order('categoria').order('descrizione_componente');
    const catColors={legno:'bb',accessorio:'bg',ferramenta:'ba',vetro:'bb',imballaggio:'bgr'};
    rowsDB=(db||[]).map(r=>\`<tr>
      <td>\${inlineInput(r.codice_componente,\`adminSalva('distinte_base','\${r.id}','codice_componente',this.value)\`,'90px','text')}</td>
      <td>\${inlineInput(r.descrizione_componente,\`adminSalva('distinte_base','\${r.id}','descrizione_componente',this.value)\`,'200px','text')}</td>
      <td><select onchange="adminSalva('distinte_base','\${r.id}','categoria',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:11px">
        \${['legno','accessorio','ferramenta','vetro','imballaggio'].map(c=>\`<option value="\${c}" \${c===r.categoria?'selected':''}>\${c}</option>\`).join('')}
      </select></td>
      <td>\${inlineInput(r.quantita??1,\`adminSalva('distinte_base','\${r.id}','quantita',this.value)\`,'55px')}</td>
      <td>\${inlineInput(r.unita_misura||'pz',\`adminSalva('distinte_base','\${r.id}','unita_misura',this.value)\`,'50px','text')}</td>
      <td>\${inlineInput(r.note||'',\`adminSalva('distinte_base','\${r.id}','note',this.value)\`,'120px','text','')}</td>
      <td><button onclick="eliminaDistinta('\${r.id}')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
    </tr>\`).join('');
    if(!rowsDB) rowsDB='<tr><td colspan="7" style="text-align:center;color:var(--mid);padding:20px;font-style:italic">Nessun componente ancora — aggiungi il primo</td></tr>';
  }

  document.getElementById('admin-main').innerHTML=\`
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
    <label style="font-size:12px;color:var(--mid)">Serie:</label>
    <select id="db-serie-filter" onchange="adminDistinte()" style="padding:5px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit">\${serieOpts}</select>
    <label style="font-size:12px;color:var(--mid)">Modello:</label>
    <select id="db-modello-filter" onchange="adminDistinte()" style="padding:5px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit;min-width:220px">\${modelloOpts}</select>
    \${filtroModello?\`<button class="btn btn-red btn-sm" onclick="nuovoComponenteDB('\${filtroModello}')">+ Aggiungi componente</button>\`:''}
  </div>
  \${filtroModello?adminCard(\`Distinta base — \${filtroModello}\`,\`
    <div style="background:var(--blue-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--blue-tx);margin-bottom:10px">
      Inserisci tutti i componenti necessari per produrre questo modello. Sarà la base per il magazzino e il ciclo produttivo.
    </div>
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Codice componente</th><th>Descrizione</th><th>Categoria</th><th>Q.tà</th><th>Unità</th><th>Note</th><th></th></tr></thead>
      <tbody>\${rowsDB}</tbody>
    </table></div>\`):'<div class="card"><p style="color:var(--mid);padding:20px;text-align:center">Seleziona una serie e un modello per gestire la distinta base</p></div>'}\`;
}

async function nuovoComponenteDB(codModello){
  const {error}=await sb.from('distinte_base').insert([{codice_modello:codModello,codice_componente:'COD',descrizione_componente:'Nuovo componente',categoria:'accessorio',quantita:1,unita_misura:'pz'}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Componente aggiunto','ok'); adminDistinte();
}

async function eliminaDistinta(id){
  if(!confirm('Eliminare questo componente dalla distinta?')) return;
  await sb.from('distinte_base').update({attivo:false}).eq('id',id);
  adminDistinte();
}

// ══════════════════════════════════════════════════════
// AGENTI
// ══════════════════════════════════════════════════════
async function adminMagazzino(){
  document.getElementById(\'admin-main\').innerHTML=
    adminSubTabs([{id:\'categorie\',label:\'Categorie\'}],\'categorie\',\'switchMagSub\')+
    \'<div id="admin-sub"></div>\';
  adminCategorieMag();
}

function switchMagSub(sub){
  adminSub=sub;adminMagazzino();
}

async function adminCategorieMag(){
  const {data,error}=await sb.from(\'categorie_magazzino\').select(\'*\').order(\'nome\');
  if(error){document.getElementById(\'admin-sub\').innerHTML=\'<p style="color:var(--red)">Errore.</p>\';return;}
  const rows=(data||[]).map(function(c){
    function flagBtn(campo,label,val){
      var on=!!val;
      return \'<span data-tabella="categorie_magazzino" data-id="\'+c.id+\'" data-campo="\'+campo+\'" data-val="\'+on+\'"\'+
        \' onclick="toggleCampo(this.dataset.tabella,this.dataset.id,this.dataset.campo,this.dataset.val)"\'+
        \' style="cursor:pointer;padding:2px 7px;border-radius:4px;font-size:11px;font-weight:600;margin-right:3px;\'+
        \'background:\'+( on?\'var(--red)\':\'var(--border)\')+\';color:\'+( on?\'#fff\':\'var(--mid)\')+\'">\'+ label +\'</span>\';
    }
    return \'<tr>\'+
      \'<td><input type="text" value="\'+c.nome+\'" data-id="\'+c.id+\'" data-campo="nome"\'+
      \' style="border:none;background:transparent;width:180px;font-size:13px" onchange="adminSalvaCatMag(this)"></td>\'+
      \'<td><input type="text" value="\'+c.codice+\'" data-id="\'+c.id+\'" data-campo="codice"\'+
      \' style="border:none;background:transparent;width:120px;font-size:13px;font-family:monospace" onchange="adminSalvaCatMag(this)"></td>\'+
      \'<td>\'+
        flagBtn(\'colori_laminato\',\'LAM\',c.colori_laminato)+
        flagBtn(\'colori_laccato\',\'LAC\',c.colori_laccato)+
        flagBtn(\'colori_ferramenta\',\'FER\',c.colori_ferramenta)+
      \'</td>\'+
      \'<td><input type="text" value="\'+( c.descrizione||\'\')+\'" data-id="\'+c.id+\'" data-campo="descrizione"\'+
      \' placeholder="Descrizione" style="border:none;background:transparent;width:200px;font-size:13px" onchange="adminSalvaCatMag(this)"></td>\'+
      \'<td style="text-align:right"><button class="btn btn-sm" style="color:var(--red)" data-cid="\'+c.id+\'" onclick="eliminaCategoriaMag(this.dataset.cid)">×</button></td>\'+
      \'</tr>\';
  }).join(\'\');
  var html=\'<table style="width:100%"><thead><tr><th>Nome</th><th>Codice</th><th>Colori</th><th>Descrizione</th><th></th></tr></thead>\'+
    \'<tbody>\'+rows+\'</tbody></table>\';
  document.getElementById(\'admin-sub\').innerHTML=adminCard(\'Categorie magazzino\',html,
    \'<button class="btn btn-sm btn-red" onclick="aggiungiCategoriaMag()">+ Nuova categoria</button>\');
}

async function adminSalvaCatMag(el){
  const id=el.dataset.id,campo=el.dataset.campo,valore=el.value.trim();
  if(!id||!campo) return;
  const {error}=await sb.from(\'categorie_magazzino\').update({[campo]:valore}).eq(\'id\',id);
  if(error){toast(\'Errore: \'+error.message,\'err\');return;}
  toast(\'Salvato\',\'ok\');
  if(el.tagName!==\'SELECT\'){el.style.background=\'var(--green-bg)\';setTimeout(function(){el.style.background=\'transparent\';},1500);}
}

async function aggiungiCategoriaMag(){
  const nome=prompt(\'Nome categoria (es. Pannello blindato):\');
  if(!nome||!nome.trim()) return;
  const codice=(prompt(\'Codice (es. PAN-BL):\')||nome.trim().toLowerCase().replace(/ /g,\'-\')).trim();
  if(!codice) return;
  const {error}=await sb.from(\'categorie_magazzino\').insert([{nome:nome.trim(),codice,tipo_colori:\'nessuno\'}]);
  if(error){toast(\'Errore: \'+error.message,\'err\');return;}
  toast(\'Categoria aggiunta\',\'ok\');
  adminCategorieMag();
}

async function eliminaCategoriaMag(id){
  if(!confirm(\'Eliminare questa categoria?\')) return;
  const {error}=await sb.from(\'categorie_magazzino\').delete().eq(\'id\',id);
  if(error){toast(\'Errore: \'+error.message,\'err\');return;}
  toast(\'Eliminata\',\'ok\');
  adminCategorieMag();
}

async function adminDistinteRegole(){
  const {data:regole}=await sb.from(\'distinta_regole\').select(\'*\').order(\'codice_serie\').order(\'nome\');
  const rows=(regole||[]).map(function(r){
    var conds=[r.codice_serie,r.codice_modello,r.tipologia,r.codice_finitura,r.colore_ferramenta].filter(Boolean).join(\' / \');
    var stato=r.attiva?\'<span class="badge bg">Attiva</span>\':\'<span class="badge br">Inattiva</span>\';
    return \'<tr>\'+
      \'<td><strong>\'+r.nome+\'</strong></td>\'+
      \'<td style="font-size:12px;color:var(--mid)">\'+( conds||\' &mdash; qualsiasi &mdash;\')+\'</td>\'+
      \'<td>\'+stato+\'</td>\'+
      \'<td style="text-align:right">\'+
        \'<button class="btn btn-sm" title="Componenti" data-rid="\'+r.id+\'" onclick="apriRegola(this.dataset.rid)" style="padding:4px 6px">\'+
        \'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button> \'+
        \'<button class="btn btn-sm" title="Modifica" data-rid="\'+r.id+\'" onclick="modificaRegola(this.dataset.rid)" style="padding:4px 6px">\'+
        \'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button> \'+
        \'<button class="btn btn-sm" title="Duplica" data-rid="\'+r.id+\'" onclick="duplicaRegola(this.dataset.rid)" style="padding:4px 6px">\'+
        \'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button> \'+
        \'<button class="btn btn-sm" title="Elimina" style="color:var(--red)" data-rid="\'+r.id+\'" onclick="eliminaRegola(this.dataset.rid)" style="padding:4px 6px">\'+
        \'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>\'+
      \'</td>\'+
      \'</tr>\';
  }).join(\'\');
  var html=\'<table style="width:100%"><thead><tr>\'+
    \'<th>Nome regola</th><th>Condizioni</th><th>Stato</th><th></th></tr></thead>\'+
    \'<tbody>\'+(rows||\'<tr><td colspan="4" style="text-align:center;color:var(--mid);padding:20px">Nessuna regola</td></tr>\')+\'</tbody></table>\';
  document.getElementById(\'distinte-sub\').innerHTML=adminCard(\'Regole distinta dinamica\',html,
    \'<button class="btn btn-sm btn-red" onclick="nuovaRegola()">+ Nuova regola</button>\');
}

async function nuovaRegola(){
  const {data:serie}=await sb.from(\'serie\').select(\'codice,nome\').order(\'nome\');
  var serieOpts=(serie||[]).map(function(s){return \'<option value="\'+s.codice+\'">\'+ s.codice+\' - \'+s.nome+\'</option>\';}).join(\'\');
  var tipoOpts=[\'BAT\',\'CS\',\'FM\',\'BAT2A\',\'CS2A\',\'ROTO\',\'SE\',\'PAS\',\'SOP\'].map(function(t){return \'<option value="\'+t+\'">\'+ t+\'</option>\';}).join(\'\');
  document.getElementById(\'modal-regola-body\').innerHTML=
    \'<div class="form-field"><label>Nome regola *</label><input id="reg-nome" type="text" placeholder="es. TAM Allori BAT"></div>\'+
    \'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">\'+
    \'<div class="form-field"><label>Serie</label><select id="reg-serie"><option value="">&mdash; tutte &mdash;</option>\'+serieOpts+\'</select></div>\'+
    \'<div class="form-field"><label>Modello (codice)</label><input id="reg-modello" type="text" placeholder="es. Allori1A"></div>\'+
    \'<div class="form-field"><label>Tipologia</label><select id="reg-tipologia"><option value="">&mdash; tutte &mdash;</option>\'+tipoOpts+\'</select></div>\'+
    \'<div class="form-field"><label>Finitura (codice)</label><input id="reg-finitura" type="text" placeholder="vuoto=tutte"></div>\'+
    \'<div class="form-field"><label>Colore ferramenta</label><input id="reg-ferramenta" type="text" placeholder="vuoto=tutti"></div>\'+
    \'</div>\'+
    \'<div class="form-field"><label>Note</label><input id="reg-note" type="text"></div>\'+
    \'<label style="font-size:12px;display:flex;align-items:center;gap:6px;margin-top:4px">\'+
    \'<input type="checkbox" id="reg-attiva" checked> Regola attiva</label>\';
  _regolaEditId=null;
  document.getElementById(\'modal-regola-title\').textContent=\'Nuova regola\';
  const mo=ensureModalInBody(\'modal-regola\');if(mo)mo.classList.add(\'open\');
}

var _regolaEditId=null;

async function salvaRegola(){
  const d={
    nome:document.getElementById(\'reg-nome\')?.value?.trim(),
    codice_serie:document.getElementById(\'reg-serie\')?.value?.trim()||null,
    codice_modello:document.getElementById(\'reg-modello\')?.value?.trim()||null,
    tipologia:document.getElementById(\'reg-tipologia\')?.value?.trim()||null,
    codice_finitura:document.getElementById(\'reg-finitura\')?.value?.trim()||null,
    colore_ferramenta:document.getElementById(\'reg-ferramenta\')?.value?.trim()||null,
    note:document.getElementById(\'reg-note\')?.value?.trim()||null,
    attiva:document.getElementById(\'reg-attiva\')?.checked??true,
  };
  if(!d.nome){toast(\'Inserisci il nome della regola\',\'err\');return;}
  var er;
  if(_regolaEditId){const r=await sb.from(\'distinta_regole\').update(d).eq(\'id\',_regolaEditId);er=r.error;}
  else{const r=await sb.from(\'distinta_regole\').insert([d]);er=r.error;}
  if(er){toast(\'Errore: \'+er.message,\'err\');return;}
  toast(\'Salvato\',\'ok\');closeForm(\'modal-regola\');adminDistinteRegole();
}

async function modificaRegola(id){
  const {data:r}=await sb.from(\'distinta_regole\').select(\'*\').eq(\'id\',id).single();
  if(!r) return;
  const {data:serie}=await sb.from(\'serie\').select(\'codice,nome\').order(\'nome\');
  var serieOpts=(serie||[]).map(function(s){return \'<option value="\'+s.codice+\'"\'+( r.codice_serie===s.codice?\' selected\':\'\')+\'>\'+ s.codice+\' - \'+s.nome+\'</option>\';}).join(\'\');
  var tipoOpts=[\'BAT\',\'CS\',\'FM\',\'BAT2A\',\'CS2A\',\'ROTO\',\'SE\',\'PAS\',\'SOP\'].map(function(t){return \'<option value="\'+t+\'"\'+( r.tipologia===t?\' selected\':\'\')+\'>\'+ t+\'</option>\';}).join(\'\');
  document.getElementById(\'modal-regola-body\').innerHTML=
    \'<div class="form-field"><label>Nome regola *</label><input id="reg-nome" type="text" value="\'+r.nome+\'"></div>\'+
    \'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">\'+
    \'<div class="form-field"><label>Serie</label><select id="reg-serie"><option value="">&mdash; tutte &mdash;</option>\'+serieOpts+\'</select></div>\'+
    \'<div class="form-field"><label>Modello (codice)</label><input id="reg-modello" type="text" value="\'+( r.codice_modello||\'\')+\'" placeholder="vuoto=tutti"></div>\'+
    \'<div class="form-field"><label>Tipologia</label><select id="reg-tipologia"><option value="">&mdash; tutte &mdash;</option>\'+tipoOpts+\'</select></div>\'+
    \'<div class="form-field"><label>Finitura (codice)</label><input id="reg-finitura" type="text" value="\'+( r.codice_finitura||\'\')+\'" placeholder="vuoto=tutte"></div>\'+
    \'<div class="form-field"><label>Colore ferramenta</label><input id="reg-ferramenta" type="text" value="\'+( r.colore_ferramenta||\'\')+\'" placeholder="vuoto=tutti"></div>\'+
    \'</div>\'+
    \'<div class="form-field"><label>Note</label><input id="reg-note" type="text" value="\'+( r.note||\'\')+\'"></div>\'+
    \'<label style="font-size:12px;display:flex;align-items:center;gap:6px;margin-top:4px">\'+
    \'<input type="checkbox" id="reg-attiva"\'+( r.attiva?\' checked\':\'\')+\'> Regola attiva</label>\';
  _regolaEditId=id;
  document.getElementById(\'modal-regola-title\').textContent=\'Modifica regola\';
  const mo=ensureModalInBody(\'modal-regola\');if(mo)mo.classList.add(\'open\');
}

async function duplicaRegola(id){
  const [{data:regola},{data:comps}]=await Promise.all([
    sb.from(\'distinta_regole\').select(\'*\').eq(\'id\',id).single(),
    sb.from(\'distinta_componenti\').select(\'*\').eq(\'regola_id\',id).order(\'ordine\'),
  ]);
  if(!regola){toast(\'Regola non trovata\',\'err\');return;}
  const nuovaRegola={...regola};
  delete nuovaRegola.id;
  delete nuovaRegola.created_at;
  nuovaRegola.nome=regola.nome+\' (copia)\';
  const {data:nr,error:e1}=await sb.from(\'distinta_regole\').insert([nuovaRegola]).select().single();
  if(e1){toast(\'Errore duplicazione regola: \'+e1.message,\'err\');return;}
  if(comps&&comps.length){
    const nuoviComps=comps.map(function(c){
      const nc={...c};
      delete nc.id;
      delete nc.created_at;
      nc.regola_id=nr.id;
      return nc;
    });
    const {error:e2}=await sb.from(\'distinta_componenti\').insert(nuoviComps);
    if(e2){toast(\'Errore duplicazione componenti: \'+e2.message,\'err\');return;}
  }
  toast(\'Regola duplicata\',\'ok\');
  adminDistinteRegole();
}

async function eliminaRegola(id){
  if(!confirm(\'Eliminare questa regola e tutti i suoi componenti?\')) return;
  await sb.from(\'distinta_componenti\').delete().eq(\'regola_id\',id);
  const {error}=await sb.from(\'distinta_regole\').delete().eq(\'id\',id);
  if(error){toast(\'Errore: \'+error.message,\'err\');return;}
  toast(\'Eliminata\',\'ok\');adminDistinteRegole();
}

async function apriRegola(id){
  _regolaEditId=id;
  const [{data:regola},{data:comps}]=await Promise.all([
    sb.from(\'distinta_regole\').select(\'*\').eq(\'id\',id).single(),
    sb.from(\'distinta_componenti\').select(\'*\').eq(\'regola_id\',id).order(\'ordine\'),
  ]);
  if(!regola) return;
  var conds=[regola.codice_serie,regola.codice_modello,regola.tipologia].filter(Boolean).join(\' / \');
  var tipiRicerca=[\'codice_fisso\',\'query_magazzino\',\'dal_configuratore\'];
  var coloriDa=[\'nessuno\',\'finitura\',\'ferramenta\',\'inserto\',\'dal_configuratore\'];
  var compRows=(comps||[]).map(function(c){
    var tipoOpts=tipiRicerca.map(function(t){return \'<option value="\'+t+\'"\'+( c.tipo_ricerca===t?\' selected\':\'\')+\'>\'+t+\'</option>\';}).join(\'\');
    var coloreOpts=coloriDa.map(function(t){return \'<option value="\'+t+\'"\'+( c.colore_da===t?\' selected\':\'\')+\'>\'+t+\'</option>\';}).join(\'\');
    return \'<tr>\'+
      \'<td><input type="text" value="\'+( c.codice_componente||\'\')+\'" data-id="\'+c.id+\'" data-campo="codice_componente"\'+
      \' placeholder="es. CERNIERE" style="border:none;background:transparent;width:90px;font-size:12px;font-family:monospace" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.descrizione||\'\')+\'" data-id="\'+c.id+\'" data-campo="descrizione"\'+
      \' style="border:none;background:transparent;width:140px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><select data-id="\'+c.id+\'" data-campo="tipo_ricerca" onchange="adminSalvaComp(this)"\'+
      \' style="border:none;background:transparent;font-size:12px">\'+tipoOpts+\'</select></td>\'+
      \'<td><input type="text" value="\'+( c.categoria_mp||\'\')+\'" data-id="\'+c.id+\'" data-campo="categoria_mp"\'+
      \' placeholder="es. AN-BAT" style="border:none;background:transparent;width:90px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.codice_mp||\'\')+\'" data-id="\'+c.id+\'" data-campo="codice_mp"\'+
      \' placeholder="es. VIT-3520" style="border:none;background:transparent;width:90px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><select data-id="\'+c.id+\'" data-campo="colore_da" onchange="adminSalvaComp(this)"\'+
      \' style="border:none;background:transparent;font-size:12px">\'+coloreOpts+\'</select></td>\'+
      \'<td><input type="text" value="\'+( c.formula_larghezza||\'\')+\'" data-id="\'+c.id+\'" data-campo="formula_larghezza"\'+
      \' placeholder="L+32" style="border:none;background:transparent;width:70px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.formula_altezza||\'\')+\'" data-id="\'+c.id+\'" data-campo="formula_altezza"\'+
      \' placeholder="H+13" style="border:none;background:transparent;width:70px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.formula_larghezza_taglio||\'\')+\'" data-id="\'+c.id+\'" data-campo="formula_larghezza_taglio"\'+
      \' placeholder="L+37" style="border:none;background:transparent;width:70px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.formula_altezza_taglio||\'\')+\'" data-id="\'+c.id+\'" data-campo="formula_altezza_taglio"\'+
      \' placeholder="H+13" style="border:none;background:transparent;width:70px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.formula_qta||\'\')+\'" data-id="\'+c.id+\'" data-campo="formula_qta"\'+
      \' placeholder="es. 2.5" style="border:none;background:transparent;width:80px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.unita||\'\')+\'" data-id="\'+c.id+\'" data-campo="unita"\'+
      \' placeholder="pz" style="border:none;background:transparent;width:40px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.condizione||\'\')+\'" data-id="\'+c.id+\'" data-campo="condizione"\'+
      \' placeholder="es. ha_vetro" style="border:none;background:transparent;width:110px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><input type="text" value="\'+( c.note||\'\')+\'" data-id="\'+c.id+\'" data-campo="note"\'+
      \' placeholder="note" style="border:none;background:transparent;width:100px;font-size:12px" onchange="adminSalvaComp(this)"></td>\'+
      \'<td><button class="btn btn-sm" style="color:var(--red)" data-cid="\'+c.id+\'" onclick="eliminaComp(this.dataset.cid)">&times;</button></td>\'+
      \'</tr>\';
  }).join(\'\');
  if(!compRows) compRows=\'<tr><td colspan="15" style="text-align:center;color:var(--mid);padding:16px">Nessun componente &mdash; aggiungi il primo</td></tr>\';
  var html=\'<div style="margin-bottom:10px;font-size:12px;color:var(--mid)">Regola: <strong>\'+regola.nome+\'</strong>\'+
    ( conds?\' &mdash; \'+conds:\'\')+\'</div>\'+
    \'<div style="overflow-x:auto"><table style="width:100%;white-space:nowrap"><thead><tr>\'+
    \'<th>Cod.comp.</th><th>Descrizione</th><th>Tipo ricerca</th><th>Categoria MP</th><th>Codice MP</th><th>Colore da</th><th>L finita</th><th>H finita</th><th>L taglio</th><th>H taglio</th><th>Q.t&agrave;</th><th>UM</th><th>Condizione</th><th>Note</th><th></th>\'+
    \'</tr></thead><tbody>\'+compRows+\'</tbody></table></div>\';
  document.getElementById(\'distinte-sub\').innerHTML=adminCard(\'Componenti: \'+regola.nome,html,
    \'<button class="btn btn-sm" onclick="adminDistinteRegole()">&larr; Regole</button> \'+
    \'<button class="btn btn-sm btn-red" data-rid="\'+id+\'" onclick="nuovoComp(this.dataset.rid)">+ Componente</button>\');
}

async function adminSalvaComp(el){
  const id=el.dataset.id,campo=el.dataset.campo,valore=el.value.trim();
  if(!id||!campo) return;
  const {error}=await sb.from(\'distinta_componenti\').update({[campo]:valore}).eq(\'id\',id);
  if(error){toast(\'Errore: \'+error.message,\'err\');return;}
  toast(\'OK\',\'ok\');
}

async function nuovoComp(regolaId){
  const {error}=await sb.from(\'distinta_componenti\').insert([{
    regola_id:regolaId,descrizione:\'Nuovo componente\',tipo_ricerca:\'codice_fisso\',formula_qta:\'1\',unita:\'pz\',colore_da:\'nessuno\',ordine:99
  }]);
  if(error){toast(\'Errore: \'+error.message,\'err\');return;}
  apriRegola(regolaId);
}

async function eliminaComp(id){
  if(!confirm(\'Eliminare questo componente?\')) return;
  await sb.from(\'distinta_componenti\').delete().eq(\'id\',id);
  if(_regolaEditId) apriRegola(_regolaEditId);
}

async function adminAgenti(){
  const [{data:agenti},{data:scala}] = await Promise.all([
    sb.from('agenti').select('*').order('cognome'),
    sb.from('provvigioni_scala').select('*').eq('attivo',true).order('sconto_da_pct'),
  ]);

  const rowsAgenti=(agenti||[]).map(a=>\`<tr>
    <td>\${inlineInput(a.nome,\`adminSalva('agenti','\${a.id}','nome',this.value)\`,'100px','text')}</td>
    <td>\${inlineInput(a.cognome,\`adminSalva('agenti','\${a.id}','cognome',this.value)\`,'120px','text')}</td>
    <td>\${inlineInput(a.email||'',\`adminSalva('agenti','\${a.id}','email',this.value)\`,'160px','text','email')}</td>
    <td>\${inlineInput(a.telefono||'',\`adminSalva('agenti','\${a.id}','telefono',this.value)\`,'120px','text')}</td>
    <td>\${inlineInput(a.zona||'',\`adminSalva('agenti','\${a.id}','zona',this.value)\`,'100px','text','es. Piemonte')}</td>
    <td>
      <button onclick="adminScalaAgente('\${a.id}','\${a.nome} \${a.cognome}')" class="btn btn-sm" style="font-size:11px">
        Scala personalizzata
      </button>
    </td>
    <td>\${adminToggle(a.attivo,\`toggleCampo('agenti','\${a.id}','attivo',\${a.attivo})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('agenti','\${a.id}','adminAgenti')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');

  const rowsScala=(scala||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.sconto_da_pct,\`adminSalva('provvigioni_scala','\${s.id}','sconto_da_pct',this.value)\`,'55px')} %</td>
    <td>\${inlineInput(s.sconto_a_pct,\`adminSalva('provvigioni_scala','\${s.id}','sconto_a_pct',this.value)\`,'55px')} %</td>
    <td>\${inlineInput(s.provvigione_pct,\`adminSalva('provvigioni_scala','\${s.id}','provvigione_pct',this.value)\`,'55px')} %</td>
    <td>\${inlineInput(s.note||'',\`adminSalva('provvigioni_scala','\${s.id}','note',this.value)\`,'200px','text','')}</td>
    <td><button onclick="eliminaRigaAdmin('provvigioni_scala','\${s.id}','adminAgenti')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');

  document.getElementById('admin-main').innerHTML=\`
  <div class="grid-2" style="gap:14px">
    \${adminCard('Agenti Max Porte',\`
      <table><thead><tr><th>Nome</th><th>Cognome</th><th>Email</th><th>Telefono</th><th>Zona</th><th>Scala provv.</th><th>Stato</th><th></th></tr></thead>
      <tbody>\${rowsAgenti||'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:20px">Nessun agente ancora</td></tr>'}</tbody></table>\`,
      \`<button class="btn btn-red btn-sm" onclick="nuovoAgente()">+ Aggiungi agente</button>\`)}
    \${adminCard('Scala provvigioni globale',\`
      <div style="background:var(--blue-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--blue-tx);margin-bottom:10px">
        All'abbassarsi dello sconto applicato al cliente, la provvigione dell'agente aumenta.<br>
        Se un agente ha una scala personalizzata, questa globale viene ignorata per quell'agente.
      </div>
      <table>
        <thead><tr><th>Sconto da %</th><th>Sconto a %</th><th>Provvigione %</th><th>Note</th><th></th></tr></thead>
        <tbody>\${rowsScala}</tbody>
      </table>\`,
      \`<button class="btn btn-red btn-sm" onclick="nuovaFasciaScala()">+ Aggiungi fascia</button>\`)}
  </div>\`;
}

async function nuovoAgente(){
  const nome=prompt('Nome:'); if(!nome) return;
  const cognome=prompt('Cognome:'); if(!cognome) return;
  const {error}=await sb.from('agenti').insert([{nome,cognome,attivo:true,percentuale_provvigione:0}]);
  if(error){toast(msgErrore(error,nome+' '+cognome),'err');return;}
  toast('Agente aggiunto','ok'); adminAgenti();
}

async function nuovaFasciaScala(){
  const da=parseFloat(prompt('Sconto da % (incluso):')||'0');
  const a=parseFloat(prompt('Sconto a % (incluso):')||'0');
  const prov=parseFloat(prompt('Provvigione %:')||'0');
  if(isNaN(da)||isNaN(a)||isNaN(prov)) return;
  const {error}=await sb.from('provvigioni_scala').insert([{sconto_da_pct:da,sconto_a_pct:a,provvigione_pct:prov}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Fascia aggiunta','ok'); adminAgenti();
}

async function adminScalaAgente(agenteId, nomeAgente){
  const {data:scala} = await sb.from('provvigioni_scala_agente').select('*').eq('agente_id',agenteId).order('sconto_da_pct');
  const {data:globale} = await sb.from('provvigioni_scala').select('*').eq('attivo',true).order('sconto_da_pct');

  const rows=(scala||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.sconto_da_pct,\`adminSalva('provvigioni_scala_agente','\${s.id}','sconto_da_pct',this.value)\`,'55px')} %</td>
    <td>\${inlineInput(s.sconto_a_pct,\`adminSalva('provvigioni_scala_agente','\${s.id}','sconto_a_pct',this.value)\`,'55px')} %</td>
    <td>\${inlineInput(s.provvigione_pct,\`adminSalva('provvigioni_scala_agente','\${s.id}','provvigione_pct',this.value)\`,'55px')} %</td>
    <td><button onclick="eliminaRigaAdmin('provvigioni_scala_agente','\${s.id}','adminAgenti')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');

  const globaleHtml=(globale||[]).map(s=>\`<span style="font-size:11px;color:var(--mid)">
    \${s.sconto_da_pct}–\${s.sconto_a_pct}% → \${s.provvigione_pct}%
  </span>\`).join(' | ');

  document.getElementById('admin-main').innerHTML=\`
  <div style="margin-bottom:14px">
    <button class="btn btn-sm" onclick="adminAgenti()">← Torna agli agenti</button>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Scala provvigioni personalizzata — \${nomeAgente}</span>
      <button class="btn btn-red btn-sm" onclick="nuovaFasciaScalaAgente('\${agenteId}')">+ Aggiungi fascia</button>
    </div>
    \${rows?\`<table><thead><tr><th>Sconto da %</th><th>Sconto a %</th><th>Provvigione %</th><th></th></tr></thead><tbody>\${rows}</tbody></table>\`
    :'<div style="padding:16px;text-align:center;color:var(--mid);font-size:13px">Nessuna scala personalizzata — viene usata la scala globale:<br><br>'+globaleHtml+'</div>'}
    \${rows?\`<div style="margin-top:10px;font-size:12px;color:var(--mid)">Scala globale (ignorata): \${globaleHtml}</div>\`:''}
  </div>\`;
}

async function nuovaFasciaScalaAgente(agenteId){
  const da=parseFloat(prompt('Sconto da % (incluso):')||'0');
  const a=parseFloat(prompt('Sconto a % (incluso):')||'0');
  const prov=parseFloat(prompt('Provvigione %:')||'0');
  if(isNaN(da)||isNaN(a)||isNaN(prov)) return;
  const {error}=await sb.from('provvigioni_scala_agente').insert([{agente_id:agenteId,sconto_da_pct:da,sconto_a_pct:a,provvigione_pct:prov}]);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Fascia aggiunta','ok'); adminScalaAgente(agenteId,'');
}

// Calcola provvigione in base allo sconto effettivo
async function calcolaProvvigione(agenteId, scontoEffettivoPct){
  if(!agenteId) return 0;
  try {
    // Cerca scala personalizzata
    const {data:pers} = await sb.from('provvigioni_scala_agente')
      .select('provvigione_pct')
      .eq('agente_id',agenteId)
      .lte('sconto_da_pct',scontoEffettivoPct)
      .gte('sconto_a_pct',scontoEffettivoPct)
      .limit(1);
    if(pers&&pers.length>0) return pers[0].provvigione_pct||0;
    // Fallback scala globale
    const {data:glob} = await sb.from('provvigioni_scala')
      .select('provvigione_pct')
      .eq('attivo',true)
      .lte('sconto_da_pct',scontoEffettivoPct)
      .gte('sconto_a_pct',scontoEffettivoPct)
      .limit(1);
    return (glob&&glob.length>0) ? glob[0].provvigione_pct||0 : 0;
  } catch(e) { return 0; }
}

// ══════════════════════════════════════════════════════
// COMPATIBILITÀ OPZIONI
// ══════════════════════════════════════════════════════
async function adminCompatibilita(){
  // Carica tutte le entità disponibili per i menu
  const [
    {data:serie},{data:modelli},{data:finiture},{data:aperture},
    {data:ferramenta},{data:vetri},{data:alu},{data:pietra},
    {data:serratureC},{data:maniglie2},
    {data:regole}
  ] = await Promise.all([
    sb.from('serie').select('codice,nome').eq('attiva',true).order('nome'),
    sb.from('modelli').select('codice,nome').eq('attivo',true).order('nome'),
    sb.from('finiture').select('codice_finitura,nome_finitura').order('nome_finitura'),
    sb.from('tipologie_apertura').select('codice,nome').eq('attiva',true).order('codice'),
    sb.from('ferramenta').select('codice,nome').eq('attivo',true).order('nome'),
    sb.from('tipi_vetro').select('codice,nome').eq('attivo',true).order('nome'),
    sb.from('colori_inserto_alluminio').select('codice,nome').order('nome'),
    sb.from('colori_pietra').select('codice,nome').order('nome'),
    sb.from('tipi_serratura').select('codice,nome').eq('attiva',true).eq('is_automatica',false).order('nome'),
    sb.from('maniglie').select('codice,nome').eq('attivo',true).order('nome'),
    sb.from('regole_compatibilita').select('*').order('entita_a_tipo').order('entita_a_codice'),
  ]);

  const ENTITA = {
    serie:    {label:'Serie',      items:serie||[],   codKey:'codice',nameKey:'nome'},
    modello:  {label:'Modello',    items:modelli||[],  codKey:'codice',nameKey:'nome'},
    finitura: {label:'Finitura', items: (() => {
      // Deduplica per codice_finitura
      const seen = new Set();
      return (finiture||[]).filter(f => {
        if(seen.has(f.codice_finitura)) return false;
        seen.add(f.codice_finitura); return true;
      });
    })(), codKey:'codice_finitura', nameKey:'nome_finitura'},
    apertura: {label:'Apertura',   items:aperture||[], codKey:'codice',nameKey:'nome'},
    ferramenta:{label:'Ferramenta',items:ferramenta||[],codKey:'codice',nameKey:'nome'},
    vetro:    {label:'Vetro',      items:vetri||[],    codKey:'codice',nameKey:'nome'},
    inserto_alu:{label:'Inserto alluminio',items:alu||[],codKey:'codice',nameKey:'nome'},
    inserto_pietra:{label:'Inserto pietra',items:pietra||[],codKey:'codice',nameKey:'nome'},
    serratura:{label:'Serratura',items:serratureC||[],codKey:'codice',nameKey:'nome'},
    maniglia:{label:'Maniglia',items:maniglie2||[],codKey:'codice',nameKey:'nome'},
  };

  // Stato filtri correnti
  const aTipo = document.getElementById('compat-a-tipo')?.value||'serie';
  const aCodice = document.getElementById('compat-a-codice')?.value||'';
  const bTipo = document.getElementById('compat-b-tipo')?.value||'finitura';

  const aItems = ENTITA[aTipo]?.items||[];
  const bItems = ENTITA[bTipo]?.items||[];

  // Opzioni per i select
  const tipiOpts = Object.entries(ENTITA).map(([k,v])=>\`<option value="\${k}">\${v.label}</option>\`).join('');

  const aCodsOpts = aItems.map(i=>\`<option value="\${i.codice||i[ENTITA[aTipo].codKey]}" \${(i.codice||i[ENTITA[aTipo].codKey])===aCodice?'selected':''}>\${i.codice||i[ENTITA[aTipo].codKey]} — \${i.nome||i[ENTITA[aTipo].nameKey]}</option>\`).join('');

  // Carica regole precise per A selezionato (query diretta, non filtraggio lato client)
  let regoleFiltrate = [];
  if(aCodice){
    const {data:rf} = await sb.from('regole_compatibilita')
      .select('*')
      .eq('entita_a_tipo', aTipo)
      .eq('entita_a_codice', aCodice);
    regoleFiltrate = rf||[];
  }
  const esclusiB = new Set(regoleFiltrate.filter(r=>r.entita_b_tipo===bTipo).map(r=>r.entita_b_codice));

  // Lista opzioni B con stato
  const opzioniHtml = bItems.map(op=>{
    const cod = op.codice||op[ENTITA[bTipo].codKey];
    const nome = op.nome||op[ENTITA[bTipo].nameKey];
    const escluso = esclusiB.has(cod);
    const regola = regoleFiltrate.find(r=>r.entita_b_tipo===bTipo&&r.entita_b_codice===cod);
    const aNome = aItems.find(i=>(i.codice||i[ENTITA[aTipo].codKey])===aCodice)?.nome||aCodice;
    return \`<div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-bottom:0.5px solid var(--border);background:\${escluso?'var(--red-bg)':'transparent'}">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:13px">\${escluso?'🚫':'✓'}</span>
        <span style="font-size:12px;font-weight:500;color:\${escluso?'var(--red-tx)':'var(--dark)'}">\${cod}</span>
        <span style="font-size:12px;color:\${escluso?'var(--red-tx)':'var(--mid)'}">\${nome}</span>
      </div>
      \${aCodice
        ? escluso
          ? \`<button onclick="rimuoviRegola('\${regola?.id}')" style="padding:3px 12px;border-radius:4px;border:0.5px solid var(--green-tx);font-size:11px;cursor:pointer;background:var(--green-bg);color:var(--green-tx);font-family:inherit">↺ Riabilita</button>\`
          : \`<button
              data-a-tipo="\${aTipo}" data-a-codice="\${aCodice}" data-a-nome="\${aNome.replace(/"/g,'&quot;')}"
              data-b-tipo="\${bTipo}" data-b-codice="\${cod}" data-b-nome="\${nome.replace(/"/g,'&quot;')}"
              onclick="aggiungiRegolaBtn(this)"
              style="padding:3px 12px;border-radius:4px;border:0.5px solid var(--border);font-size:11px;cursor:pointer;background:none;color:var(--mid);font-family:inherit">🚫 Escludi</button>\`
        : '<span style="font-size:11px;color:var(--mid)">Seleziona un valore A</span>'
      }
    </div>\`;
  }).join('');

  // Lista tutte le regole esistenti
  const tutteRegole = (regole||[]).map(r=>\`<tr style="font-size:12px">
    <td style="padding:5px 8px"><span class="tag" style="font-size:10px">\${ENTITA[r.entita_a_tipo]?.label||r.entita_a_tipo}</span></td>
    <td style="padding:5px 8px;font-weight:500">\${r.entita_a_codice}</td>
    <td style="padding:5px 8px;color:var(--mid)">\${r.entita_a_nome||''}</td>
    <td style="padding:5px 8px;color:var(--mid)">→ esclude</td>
    <td style="padding:5px 8px"><span class="tag" style="font-size:10px;background:var(--red-bg);color:var(--red-tx)">\${ENTITA[r.entita_b_tipo]?.label||r.entita_b_tipo}</span></td>
    <td style="padding:5px 8px;font-weight:500;color:var(--red-tx)">\${r.entita_b_codice}</td>
    <td style="padding:5px 8px;color:var(--mid)">\${r.entita_b_nome||''}</td>
    <td style="padding:5px 8px"><button onclick="rimuoviRegola('\${r.id}')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');

  document.getElementById('admin-main').innerHTML=\`
  <div style="display:flex;gap:14px;height:calc(100vh - 110px);overflow:hidden">

    <!-- Pannello sinistro: crea nuove regole -->
    <div style="width:420px;min-width:420px;display:flex;flex-direction:column;gap:10px">
      \${adminCard('Aggiungi regola di esclusione',\`
        <div style="background:var(--green-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--green-tx);margin-bottom:12px">
          Tutto è disponibile per default. Definisci solo le esclusioni: <em>"Se si sceglie A → escludi B"</em>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
          <div>
            <div style="font-size:11px;color:var(--mid);margin-bottom:4px;font-weight:500">SE SI SCEGLIE...</div>
            <select id="compat-a-tipo" onchange="adminCompatibilita()" style="width:100%;padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px;font-family:inherit;margin-bottom:6px">
              \${Object.entries(ENTITA).map(([k,v])=>\`<option value="\${k}" \${k===aTipo?'selected':''}>\${v.label}</option>\`).join('')}
            </select>
            <select id="compat-a-codice" onchange="adminCompatibilita()" style="width:100%;padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px;font-family:inherit">
              <option value="">— Seleziona —</option>
              \${aCodsOpts}
            </select>
          </div>
          <div>
            <div style="font-size:11px;color:var(--mid);margin-bottom:4px;font-weight:500">...ESCLUDI QUESTA OPZIONE</div>
            <select id="compat-b-tipo" onchange="adminCompatibilita()" style="width:100%;padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px;font-family:inherit;margin-bottom:6px">
              \${Object.entries(ENTITA).map(([k,v])=>\`<option value="\${k}" \${k===bTipo?'selected':''}>\${v.label}</option>\`).join('')}
            </select>
            <div style="font-size:11px;color:var(--mid)">\${bItems.length} opzioni disponibili</div>
          </div>
        </div>
        <div style="max-height:calc(100vh - 380px);overflow-y:auto;border:0.5px solid var(--border);border-radius:var(--radius)">
          \${aCodice
            ? opzioniHtml||'<div style="padding:16px;text-align:center;color:var(--mid);font-size:12px">Nessuna opzione B per questa categoria</div>'
            : '<div style="padding:20px;text-align:center;color:var(--mid);font-size:12px">Seleziona prima un valore A per vedere le opzioni</div>'}
        </div>
      \`)}
    </div>

    <!-- Pannello destro: elenco tutte le regole -->
    <div style="flex:1;overflow-y:auto">
      \${adminCard(\`Tutte le regole attive (\${regole?.length||0})\`,\`
        \${tutteRegole
          ? \`<div style="overflow-x:auto"><table style="width:100%">
              <thead><tr><th>Se tipo A</th><th>Codice A</th><th>Nome A</th><th></th><th>Esclude B</th><th>Codice B</th><th>Nome B</th><th></th></tr></thead>
              <tbody>\${tutteRegole}</tbody>
            </table></div>\`
          : '<div style="padding:20px;text-align:center;color:var(--mid);font-style:italic">Nessuna regola ancora — tutte le combinazioni sono disponibili</div>'}
      \`)}
    </div>
  </div>\`;
}

function aggiungiRegolaBtn(btn){
  const at=btn.dataset.aTipo, ac=btn.dataset.aCodice, an=btn.dataset.aNome;
  const bt=btn.dataset.bTipo, bc=btn.dataset.bCodice, bn=btn.dataset.bNome;
  aggiungiRegola(at,ac,an,bt,bc,bn);
}

async function aggiungiRegola(aTipo, aCodice, aNome, bTipo, bCodice, bNome){
  const {error}=await sb.from('regole_compatibilita').insert([{
    entita_a_tipo:aTipo, entita_a_codice:aCodice, entita_a_nome:aNome,
    entita_b_tipo:bTipo, entita_b_codice:bCodice, entita_b_nome:bNome
  }]);
  if(error){
    if(error.code==='23505'||error.message?.includes('duplicate')||error.message?.includes('unique')){
      toast('Questa regola esiste già','err');
    } else {
      toast('Errore: '+error.message,'err');
    }
    adminCompatibilita();
    return;
  }
  toast('Regola aggiunta','ok');
  adminCompatibilita();
}

async function rimuoviRegola(id){
  await sb.from('regole_compatibilita').delete().eq('id',id);
  toast('Regola rimossa','ok');
  adminCompatibilita();
}

// compatibilità legacy (usata dal vecchio sistema)
async function setCompatEscludi(){ adminCompatibilita(); }
async function rimuoviCompat(t,id){ await rimuoviRegola(id); }

// ══════════════════════════════════════════════════════
// IMPOSTAZIONI
// ══════════════════════════════════════════════════════
async function adminLavorazioni(){
  const {data:lav} = await sb.from('impostazioni').select('*').like('chiave','lav_%');
  const {data:suppTaglio} = await sb.from('impostazioni').select('valore').eq('chiave','supplemento_taglio_pannello').maybeSingle();
  const rows = (lav||[]).map(l=>\`<tr>
    <td>\${inlineInput(l.descrizione||l.chiave,\`adminSalva('impostazioni','\${l.id}','descrizione',this.value)\`,'240px')}</td>
    <td>\${inlineInput(l.valore,\`adminSalva('impostazioni','\${l.id}','valore',this.value)\`,'100px','number')} €</td>
    <td><button onclick="eliminaRigaAdmin('impostazioni','\${l.id}','adminLavorazioni')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');

  document.getElementById('admin-main').innerHTML=\`
    \${adminCard('Supplemento taglio a misura pannelli blindati',\`
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px">
        <input type="number" id="imp-taglio" value="\${suppTaglio?.valore||0}" min="0" step="0.01"
          style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-weight:600;width:120px">
        <span style="font-size:13px;color:var(--mid)">€</span>
        <button class="btn btn-sm" onclick="salvaImpostazione('supplemento_taglio_pannello','imp-taglio')">Salva</button>
      </div>
      <div style="font-size:11px;color:var(--mid)">Supplemento applicato ai pannelli blindati tagliati a misura</div>
    \`)}
    \${adminCard('Altre lavorazioni extra',\`
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;padding-bottom:12px;border-bottom:0.5px solid var(--border)">
        <input type="text" id="lav-desc" placeholder="Descrizione lavorazione" style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;flex:1">
        <input type="number" id="lav-prezzo" placeholder="€" min="0" step="0.01" style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:100px">
        <button class="btn btn-red btn-sm" onclick="aggiungiLavorazione()">+ Aggiungi</button>
      </div>
      <table><thead><tr><th>Descrizione</th><th>Prezzo (€)</th><th></th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="3" style="text-align:center;color:var(--mid);padding:16px;font-style:italic">Nessuna lavorazione configurata</td></tr>'}</tbody>
      </table>
    \`)}\`;
}

async function aggiungiLavorazione(){
  const desc = document.getElementById('lav-desc')?.value.trim();
  const prezzo = document.getElementById('lav-prezzo')?.value;
  if(!desc){toast('Inserisci la descrizione','err');return;}
  const chiave = 'lav_'+Date.now();
  const {error} = await sb.from('impostazioni').insert({chiave, valore:prezzo||'0', descrizione:desc});
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Lavorazione aggiunta','ok'); adminLavorazioni();
}

// ══════════════════════════════════════════════════════
// SPEDIZIONI — Imballi e Trasporti
// ══════════════════════════════════════════════════════
async function adminSpedizioni(){
  const tabs=[{id:'imballi',label:'Imballi'},{id:'trasporti',label:'Trasporti'}];
  let body='';
  if(adminSub==='imballi'){
    const {data:imb} = await sb.from('listino_imballi').select('*').order('descrizione');
    const {data:suppFrag} = await sb.from('impostazioni').select('valore').eq('chiave','supplemento_imballo_fragile').maybeSingle();
    const METODI=[['per_pezzo','Per pezzo'],['a_scatola','A scatola'],['a_posizione','A posizione']];
    const rows=(imb||[]).map(i=>{
      const metOpts=METODI.map(m=>\`<option value="\${m[0]}" \${(i.metodo||'per_pezzo')===m[0]?'selected':''}>\${m[1]}</option>\`).join('');
      return \`<tr>
      <td><code style="font-size:11px;color:var(--mid)">\${i.codice}</code></td>
      <td>\${inlineInput(i.descrizione,\`salvaImballo('\${i.codice}','descrizione',this.value)\`,'200px','text')}</td>
      <td>\${inlineInput(i.prezzo,\`salvaImballo('\${i.codice}','prezzo',this.value)\`,'80px','number')} €</td>
      <td><select onchange="salvaImballo('\${i.codice}','metodo',this.value)" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:12px">\${metOpts}</select></td>
      <td style="text-align:center">\${(i.metodo==='a_scatola')?inlineInput(i.capienza,\`salvaImballo('\${i.codice}','capienza',this.value)\`,'60px','number'):'<span style="color:var(--border)">—</span>'}</td>
      <td>\${inlineInput(i.gruppo_scatola,\`salvaImballo('\${i.codice}','gruppo_scatola',this.value)\`,'110px','text','—')}</td>
      <td style="text-align:center"><input type="checkbox" \${i.attivo?'checked':''} onchange="salvaImballo('\${i.codice}','attivo',this.checked)"></td>
      <td><button onclick="eliminaImballo('\${i.codice}')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
    </tr>\`;}).join('');
    body=\`
    \${adminCard('Supplemento imballo fragili / vetro',\`
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px">
        <input type="number" id="imp-frag" value="\${suppFrag?.valore||0}" min="0" step="0.01"
          style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-weight:600;width:120px">
        <span style="font-size:13px;color:var(--mid)">€</span>
        <button class="btn btn-sm" onclick="salvaImpostazione('supplemento_imballo_fragile','imp-frag')">Salva</button>
      </div>
      <div style="font-size:11px;color:var(--mid)">Aggiunto all'imballo dei prodotti su serie marcate come fragili (es. GL vetro)</div>
    \`)}
    \${adminCard('Listino imballi',\`
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;padding-bottom:12px;border-bottom:0.5px solid var(--border);flex-wrap:wrap">
        <input type="text" id="imb-cod" placeholder="CODICE" style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:120px;text-transform:uppercase">
        <input type="text" id="imb-desc" placeholder="Descrizione" style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;flex:1;min-width:150px">
        <input type="number" id="imb-prezzo" placeholder="€" min="0" step="0.01" style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:80px">
        <select id="imb-metodo" onchange="document.getElementById('imb-capienza').style.display=this.value==='a_scatola'?'inline-block':'none'" style="padding:6px 8px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px">
          <option value="per_pezzo">Per pezzo</option><option value="a_scatola">A scatola</option><option value="a_posizione">A posizione</option>
        </select>
        <input type="number" id="imb-capienza" placeholder="pz/scatola" min="1" style="display:none;padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:100px">
        <input type="text" id="imb-gruppo" placeholder="Gruppo (opz.)" style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;width:130px;text-transform:uppercase">
        <button class="btn btn-red btn-sm" onclick="aggiungiImballo()">+ Aggiungi</button>
      </div>
      <table><thead><tr><th>Codice</th><th>Descrizione</th><th>Prezzo</th><th>Metodo</th><th style="text-align:center">Capienza</th><th>Gruppo</th><th style="text-align:center">Attivo</th><th></th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:16px;font-style:italic">Nessun imballo configurato</td></tr>'}</tbody>
      </table>
      <div style="font-size:11px;color:var(--mid);margin-top:8px">Per pezzo = prezzo × quantità · A scatola = arrotonda(quantità ÷ capienza) × prezzo · A posizione = prezzo una volta. Il "Gruppo" serve a unire più articoli nelle stesse scatole in produzione (es. COPRIFILI per coprifili+ringrossi).</div>
    \`)}\`;
  } else {
    // TRASPORTI
    const {data:zone} = await sb.from('zone_trasporto').select('*').order('ordine');
    const {data:tar} = await sb.from('listino_trasporti').select('*').order('zona_id').order('min_porte');
    const tarByZona={}; (tar||[]).forEach(t=>{ (tarByZona[t.zona_id]=tarByZona[t.zona_id]||[]).push(t); });
    const zoneCards=(zone||[]).map(z=>{
      const scal=(tarByZona[z.id]||[]).map(t=>\`<tr>
        <td>\${inlineInput(t.min_porte,\`adminSalva('listino_trasporti','\${t.id}','min_porte',this.value)\`,'60px','number')}</td>
        <td>\${inlineInput(t.max_porte,\`adminSalva('listino_trasporti','\${t.id}','max_porte',this.value)\`,'60px','number','∞')}</td>
        <td>\${inlineInput(t.prezzo_proprio,\`adminSalva('listino_trasporti','\${t.id}','prezzo_proprio',this.value)\`,'80px','number')} €</td>
        <td>\${inlineInput(t.prezzo_corriere,\`adminSalva('listino_trasporti','\${t.id}','prezzo_corriere',this.value)\`,'80px','number')} €</td>
        <td><button onclick="eliminaTariffa('\${t.id}')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:15px">×</button></td>
      </tr>\`).join('');
      return adminCard('',\`
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;flex-wrap:wrap">
          <div style="flex:1;min-width:180px">
            <div style="font-size:11px;color:var(--mid);margin-bottom:2px">Zona</div>
            \${inlineInput(z.nome,\`adminSalva('zone_trasporto','\${z.id}','nome',this.value)\`,'100%','text')}
          </div>
          <div style="flex:2;min-width:200px">
            <div style="font-size:11px;color:var(--mid);margin-bottom:2px">Province (sigle, separate da virgola)</div>
            \${inlineInput(z.province,\`adminSalva('zone_trasporto','\${z.id}','province',this.value)\`,'100%','text','TO,CN,AT')}
          </div>
          <button onclick="eliminaZona('\${z.id}')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:12px;align-self:flex-end;padding-bottom:4px">Elimina zona</button>
        </div>
        <table style="font-size:12px"><thead><tr><th>Da (porte)</th><th>A</th><th>Mezzo proprio</th><th>Corriere</th><th></th></tr></thead>
        <tbody>\${scal||'<tr><td colspan="5" style="color:var(--mid);font-style:italic;padding:8px">Nessuno scaglione</td></tr>'}</tbody></table>
        <button class="btn btn-sm" style="margin-top:8px" onclick="aggiungiTariffa('\${z.id}')">+ Aggiungi scaglione</button>
      \`);
    }).join('');
    body=\`
    \${adminCard('Zone di trasporto',\`
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <input type="text" id="zona-nome" placeholder="Nome zona (es. Piemonte)" style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;flex:1;min-width:180px">
        <input type="text" id="zona-prov" placeholder="Province: TO,CN,AT" style="padding:6px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;flex:1;min-width:180px;text-transform:uppercase">
        <button class="btn btn-red btn-sm" onclick="aggiungiZona()">+ Aggiungi zona</button>
      </div>
      <div style="font-size:11px;color:var(--mid);margin-top:8px">La zona viene proposta automaticamente sul documento in base alla provincia del cliente. Gli scaglioni sono per numero di porte.</div>
    \`)}
    \${zoneCards||'<div style="color:var(--mid);font-style:italic;padding:12px">Nessuna zona configurata.</div>'}\`;
  }
  document.getElementById('admin-main').innerHTML = adminSubTabs(tabs, adminSub, 'switchAdminSub') + body;
}

// --- Imballi: add/delete ---
async function aggiungiImballo(){
  const cod=(document.getElementById('imb-cod')?.value||'').trim().toUpperCase();
  const desc=(document.getElementById('imb-desc')?.value||'').trim();
  const prezzo=document.getElementById('imb-prezzo')?.value||'0';
  const metodo=document.getElementById('imb-metodo')?.value||'per_pezzo';
  const capienza=document.getElementById('imb-capienza')?.value;
  const gruppo=(document.getElementById('imb-gruppo')?.value||'').trim().toUpperCase();
  if(!cod){toast('Inserisci un codice','err');return;}
  if(!desc){toast('Inserisci la descrizione','err');return;}
  if(metodo==='a_scatola' && (!capienza||parseInt(capienza)<1)){toast('Per il metodo "a scatola" indica la capienza (pezzi per scatola)','err');return;}
  const rec={codice:cod,descrizione:desc,prezzo:parseFloat(prezzo)||0,metodo,attivo:true,
    per_pezzo:(metodo==='per_pezzo'),
    capienza:metodo==='a_scatola'?parseInt(capienza):null,
    gruppo_scatola:gruppo||null};
  const {error}=await sb.from('listino_imballi').insert(rec);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Imballo aggiunto','ok'); adminSpedizioni();
}
async function eliminaImballo(cod){
  if(!confirm('Eliminare questo imballo?'))return;
  const {error}=await sb.from('listino_imballi').delete().eq('codice',cod);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Imballo eliminato','ok'); adminSpedizioni();
}

// --- Trasporti: zone e tariffe ---
async function aggiungiZona(){
  const nome=(document.getElementById('zona-nome')?.value||'').trim();
  const prov=(document.getElementById('zona-prov')?.value||'').trim().toUpperCase();
  if(!nome){toast('Inserisci il nome della zona','err');return;}
  const {error}=await sb.from('zone_trasporto').insert({nome,province:prov,ordine:Date.now()%100000});
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Zona aggiunta','ok'); adminSpedizioni();
}
async function eliminaZona(id){
  if(!confirm('Eliminare la zona e i suoi scaglioni?'))return;
  const {error}=await sb.from('zone_trasporto').delete().eq('id',id);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Zona eliminata','ok'); adminSpedizioni();
}
async function aggiungiTariffa(zonaId){
  const {error}=await sb.from('listino_trasporti').insert({zona_id:parseInt(zonaId),min_porte:1,max_porte:null,prezzo_proprio:0,prezzo_corriere:0});
  if(error){toast('Errore: '+error.message,'err');return;}
  adminSpedizioni();
}
async function eliminaTariffa(id){
  const {error}=await sb.from('listino_trasporti').delete().eq('id',id);
  if(error){toast('Errore: '+error.message,'err');return;}
  adminSpedizioni();
}

async function salvaImballo(codice, campo, valore){
  let val = valore;
  if(campo==='prezzo'){ val = parseFloat(valore); if(isNaN(val)) return; }
  else if(campo==='capienza'){ val = (valore===''||valore==null)?null:parseInt(valore); if(val!=null&&isNaN(val)) return; }
  else if(campo==='gruppo_scatola'){ val = (valore||'').trim().toUpperCase()||null; }
  const patch = {[campo]:val};
  // Mantieni il vecchio flag per_pezzo coerente col metodo
  if(campo==='metodo') patch.per_pezzo = (val==='per_pezzo');
  const {error} = await sb.from('listino_imballi').update(patch).eq('codice',codice);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Salvato','ok');
  if(campo==='metodo') adminSpedizioni(); // ridisegna: mostra/nasconde capienza
}
function switchAdminSub(sub){ adminSub=sub; adminSpedizioni(); }

function adminImpostazioni(){
  sb.from('impostazioni').select('*').then(({data})=>{
    const imp={};(data||[]).forEach(r=>{imp[r.chiave]=r.valore;});
    document.getElementById('admin-main').innerHTML=\`
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Numerazione documenti</div>
        <div style="font-size:13px;color:var(--mid);margin-bottom:12px">Le sequenze numeriche vengono gestite automaticamente da Supabase. I prefissi sono configurati nel codice.</div>
        <table style="font-size:13px">
          <tr><td style="color:var(--mid);padding:4px 0">Formato preventivi</td><td><strong>PRV-YYYY-NNNN</strong></td></tr>
          <tr><td style="color:var(--mid);padding:4px 0">Formato ordini</td><td><strong>ORD-YYYY-NNNN</strong></td></tr>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Supabase Storage</div>
        <div style="font-size:13px;color:var(--mid);margin-bottom:10px">Bucket per le immagini del catalogo</div>
        <div style="background:var(--green-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--green-tx)">
          Bucket <strong>catalogo_immagini</strong> configurato e attivo
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Gestione utenti e ruoli</div>
      <div id="utenti-content"><div class="loading"><div class="spinner"></div></div></div>
    </div>\`;
    renderUtentiInline();
  });
}

async function salvaImpostazione(chiave,inputId){
  const val=document.getElementById(inputId)?.value;
  if(val===null||val===undefined) return;
  const {error}=await sb.from('impostazioni').upsert({chiave,valore:val},{onConflict:'chiave'});
  if(error){toast('Errore: '+error.message,'err');}
  else{toast('Salvato','ok');}
}

async function renderUtentiInline(){
  // Raggruppa per user_id per mostrare ruoli multipli
  const {data} = await sb.from('utenti_ruoli').select('*').order('user_id');
  const {data:ruoliDisp} = await sb.from('ruoli').select('*').eq('attivo',true).order('nome');
  const byUser = {};
  (data||[]).forEach(r=>{ if(!byUser[r.user_id]) byUser[r.user_id]={ruoli:[],created_at:r.created_at}; byUser[r.user_id].ruoli.push(r); });
  const ruoliOpts=(ruoliDisp||[]).map(r=>\`<option value="\${r.codice}">\${r.nome}</option>\`).join('');

  const rows=Object.entries(byUser).map(([uid,info])=>{
    const ruoliBadge=info.ruoli.map(r=>\`
      <span style="display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:99px;font-size:11px;background:var(--blue-bg);color:var(--blue-tx);margin:1px">
        \${RUOLI_LABEL[r.codice_ruolo]||r.codice_ruolo}
        <span onclick="rimuoviRuoloUtente('\${r.id}')" style="cursor:pointer;color:var(--mid)" title="Rimuovi">×</span>
      </span>\`).join('');
    return \`<tr>
      <td style="font-size:11px;color:var(--mid);font-family:monospace">\${uid.slice(0,20)}...</td>
      <td><input type="text" placeholder="Nome" value="\${info.ruoli[0]?.nome||''}" style="width:80px;padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:12px" onchange="aggiornaNomeCognome('\${info.ruoli[0]?.id}','nome',this.value)"></td>
      <td><input type="text" placeholder="Cognome" value="\${info.ruoli[0]?.cognome||''}" style="width:90px;padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:12px" onchange="aggiornaNomeCognome('\${info.ruoli[0]?.id}','cognome',this.value)"></td>
      <td style="max-width:280px">
        \${ruoliBadge}
        <br><div style="display:flex;gap:4px;margin-top:4px">
          <select id="add-role-\${uid.replace(/-/g,'')}" style="padding:3px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:11px;font-family:inherit">\${ruoliOpts}</select>
          <button onclick="aggiungiRuoloUtente('\${uid}','add-role-\${uid.replace(/-/g,'')}')" class="btn btn-sm" style="font-size:11px;padding:3px 8px">+ Aggiungi ruolo</button>
        </div>
      </td>
      <td style="font-size:12px;color:var(--mid)">\${new Date(info.created_at).toLocaleDateString('it-IT')}</td>
      <td><button onclick="eliminaUtente('\${uid}')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px" title="Rimuovi utente">×</button></td>
    </tr>\`;
  }).join('');

  document.getElementById('utenti-content').innerHTML=\`
  <div style="background:var(--blue-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--blue-tx);margin-bottom:12px">
    Ogni utente può avere più ruoli. I permessi vengono aggregati da tutti i ruoli assegnati. Il super_admin ha accesso completo a tutto.
  </div>
  <table style="margin-bottom:16px">
    <thead><tr><th>User ID</th><th>Nome</th><th>Cognome</th><th>Ruoli assegnati</th><th>Dal</th><th></th></tr></thead>
    <tbody>\${rows||'<tr><td colspan="4" style="text-align:center;color:var(--mid);padding:16px">Nessun utente</td></tr>'}</tbody>
  </table>
  <div style="border-top:0.5px solid var(--border);padding-top:14px">
    <div style="font-size:12px;font-weight:500;margin-bottom:8px">Aggiungi nuovo utente</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <input type="text" id="new-user-id" placeholder="Incolla user_id da Supabase Auth..." style="flex:1;min-width:200px;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit">
      <select id="new-user-ruolo" style="padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit">\${ruoliOpts}</select>
      <button class="btn btn-red" onclick="aggiungiUtente()">Aggiungi</button>
    </div>
  </div>\`;
}

async function aggiungiRuoloUtente(userId, selectId){
  const ruolo = document.getElementById(selectId)?.value;
  if(!ruolo) return;
  const {error} = await sb.from('utenti_ruoli').insert([{user_id:userId, codice_ruolo:ruolo}]);
  if(error){toast('Errore (ruolo già assegnato?): '+error.message,'err');return;}
  toast('Ruolo aggiunto','ok'); renderUtentiInline();
}

async function rimuoviRuoloUtente(rigaId){
  if(!confirm('Rimuovere questo ruolo dall\\'utente?')) return;
  await sb.from('utenti_ruoli').delete().eq('id',rigaId);
  toast('Ruolo rimosso','ok'); renderUtentiInline();
}

async function eliminaUtente(userId){
  if(!confirm('Rimuovere TUTTI i ruoli di questo utente?')) return;
  await sb.from('utenti_ruoli').delete().eq('user_id',userId);
  toast('Utente rimosso','ok'); renderUtentiInline();
}

// ══════════════════════════════════════════════════════
// FUNZIONI GENERICHE ADMIN
// ══════════════════════════════════════════════════════
function msgErrore(error, valore){
  if(error.code==='23505'||error.message?.includes('duplicate')||error.message?.includes('unique')){
    return \`Il codice "\${valore}" esiste già — scegli un codice diverso.\`;
  }
  return 'Errore: '+error.message;
}

async function adminSalva(tabella, id, campo, valore){
  let val = valore;
  const numericFields=['sovrapprezzo_a','sovrapprezzo_p','prezzo_a','prezzo_p','prezzo_base',
    'prezzo_vetro','prezzo_extra_incisioni','sovrapprezzo_bugna_A','sovrapprezzo_bugna_P',
    'maggiorazione_pct','spalla_cm','spessore_da_cm','spessore_a_cm','cm_accessorio',
    'prezzo_access_A','prezzo_access_P','spalla_cassone_cm','quantita',
    'percentuale_provvigione','sconto_base_pct','sconto_max_pct',
    'prezzo','min_porte','max_porte','prezzo_proprio','prezzo_corriere',
    'supplemento','ordine'];
  if(campo==='max_porte' && (valore===''||valore===null||valore===undefined)){
    val = null;  // max vuoto = scaglione illimitato
  } else if(numericFields.includes(campo)){
    val = parseFloat(valore);
    if(isNaN(val)) return;
  }
  const {error} = await sb.from(tabella).update({[campo]:val}).eq('id',id);
  if(error){toast(msgErrore(error,valore),'err');return;}
  toast('Salvato','ok');
}

async function salvaPrezzo(codModello, listino, campo, valore){
  const val = parseFloat(valore);
  if(isNaN(val)) return;
  const {data:existing} = await sb.from('prezzi_modello')
    .select('id').eq('codice_modello',codModello).eq('listino',listino).limit(1);
  if(existing && existing.length > 0){
    const {error} = await sb.from('prezzi_modello').update({[campo]:val}).eq('codice_modello',codModello).eq('listino',listino);
    if(error){toast('Errore: '+error.message,'err');return;}
  } else {
    const {error} = await sb.from('prezzi_modello').insert([{codice_modello:codModello,listino,[campo]:val}]);
    if(error){toast('Errore: '+error.message,'err');return;}
  }
  toast('Prezzo salvato','ok');
  adminModelli();
}

async function toggleCampo(tabella, id, campo, attualeStr){
  const attuale = attualeStr===true||attualeStr==='true';
  const {error} = await sb.from(tabella).update({[campo]:!attuale}).eq('id',id);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast(!attuale?'Attivato':'Disattivato','ok');
  // Refresh current view
  loadAdminSection();
}

async function nuovaRiga(tabella, defaultData, callback){
  const {error} = await sb.from(tabella).insert([defaultData]);
  if(error){toast(msgErrore(error, defaultData.codice||defaultData.nome||''),'err');return;}
  toast('Riga aggiunta','ok');
  if(callback && window[callback]) window[callback]();
}

async function nuovaRigaUpsert(tabella, defaultData, callback){
  // Genera un codice univoco aggiungendo un suffisso random se necessario
  let data = {...defaultData};
  if(data.codice) data.codice = data.codice + Math.random().toString(36).slice(2,5).toUpperCase();
  const {error} = await sb.from(tabella).insert([data]);
  if(error){toast(msgErrore(error, data.codice||data.nome||''),'err');return;}
  toast('Riga aggiunta','ok');
  if(callback && window[callback]) window[callback]();
}

async function uploadImmagine(tabella, id, input){
  const file = input.files[0];
  if(!file) return;
  const ext = file.name.split('.').pop();
  const path = \`\${tabella}/\${id}.\${ext}\`;
  toast('Caricamento in corso...','ok');
  const {error:upErr} = await sb.storage.from('catalogo_immagini').upload(path, file, {upsert:true});
  if(upErr){toast('Errore upload: '+upErr.message,'err');return;}
  const {data:urlData} = sb.storage.from('catalogo_immagini').getPublicUrl(path);
  const url = urlData?.publicUrl;
  if(url){
    await sb.from(tabella).update({immagine_url:url}).eq('id',id);
    toast('Immagine caricata','ok');
    loadAdminSection();
  }
}

// ── UTENTI E RUOLI ─────────────────────────────────────
async function renderUtenti(){
  // Redirect to impostazioni
  adminSection='impostazioni';
  renderAdmin();
}

// aggiornaRuolo mantenuto per compatibilità (non più usato direttamente)
async function aggiornaNomeCognome(rigaId, campo, valore){
  if(!rigaId) return;
  const {error} = await sb.from('utenti_ruoli').update({[campo]:valore}).eq('id',rigaId);
  if(error){ toast('Errore: '+error.message,'err'); return; }
  toast('Aggiornato','ok');
}

async function aggiornaRuolo(id, ruolo){
  const {error} = await sb.from('utenti_ruoli').update({codice_ruolo:ruolo}).eq('id',id);
  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Ruolo aggiornato','ok');
}

async function aggiungiUtente(){
  const userId = document.getElementById('new-user-id').value.trim();
  const ruolo = document.getElementById('new-user-ruolo').value;
  if(!userId){toast('Inserisci un user_id valido','err');return;}
  const {error} = await sb.from('utenti_ruoli').insert([{user_id:userId, codice_ruolo:ruolo}]);
  if(error){toast('Errore (utente già presente con questo ruolo?): '+error.message,'err');return;}
  toast('Utente aggiunto con ruolo '+RUOLI_LABEL[ruolo],'ok');
  renderUtentiInline();
}


// Sposta i modal nel body per evitare problemi di z-index e display
document.addEventListener('DOMContentLoaded', function() {
  ['modal-cfg', 'modal-nuovo-doc'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el && el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  });
});

function ensureModalInBody(id) {
  const el = document.getElementById(id);
  if (el && el.parentElement !== document.body) {
    document.body.appendChild(el);
  }
  return el;
}

// Sposta i modal fuori da qualsiasi container al caricamento
(function(){
  var toMove = ['modal-cfg', 'modal-nuovo-doc'];
  toMove.forEach(function(id){
    var el = document.getElementById(id);
    if(el && el.parentElement && el.parentElement.id !== 'body-root'){
      document.body.appendChild(el);
    }
  });
})();

// ── ESPORTA PDF ───────────────────────────────────────
async function esportaPDF(tipo, id) {
  // Apri modal opzioni export
  _exportTipo = tipo;
  _exportId = id;
  const mo = ensureModalInBody('modal-export');
  if(mo) mo.classList.add('open');
}

var _exportTipo=null, _exportId=null;

async function eseguiEsportaPDF() {
  const tipo = _exportTipo, id = _exportId;
  const soloNetti = document.getElementById('exp-solo-netti')?.checked || false;
  closeForm('modal-export');
  toast('Generazione PDF in corso...', 'ok');
  try {
    const tabDoc = tipo==='preventivo' ? 'preventivi' : 'ordini_vendita';
    const tabRighe = tipo==='preventivo' ? 'righe_preventivo' : 'righe_ordine';
    const fkRiga = tipo==='preventivo' ? 'preventivo_id' : 'ordine_id';

    // Carica documento completo
    const [{data:doc}, {data:righe}, {data:cliente}] = await Promise.all([
      sb.from(tabDoc).select('*,anagrafiche(*),agenti(nome,cognome)').eq('id',id).single(),
      sb.from(tabRighe).select('*').eq(fkRiga,id).order('riga_numero'),
      sb.from(tabDoc).select('*,anagrafiche(*)').eq('id',id).single(),
    ]);

    if(!doc){ toast('Documento non trovato','err'); return; }

    const an = doc.anagrafiche || {};
    const ag = doc.agenti || {};

    // Payload per il server
    const payload = {
      tipo,
      documento: {
        numero: doc.numero,
        data: new Date(doc.data_creazione||doc.created_at).toLocaleDateString('it-IT'),
        data_ultima_modifica: doc.data_ultima_modifica ? new Date(doc.data_ultima_modifica).toLocaleDateString('it-IT') : '',
        compilatore: doc.nome_compilatore || '',
        tipo_documento: tipo==='preventivo' ? 'PREVENTIVO' : 'CONFERMA D\\'ORDINE',
        // Cliente
        ragione_sociale: an.ragione_sociale || '',
        ragione_sociale_riga2: an.ragione_sociale_riga2 || '',
        indirizzo: an.indirizzo || '',
        cap: an.cap || '',
        citta: an.citta || '',
        provincia: an.provincia || '',
        paese: an.paese || 'Italia',
        partita_iva: an.partita_iva || '',
        codice_fiscale: an.codice_fiscale || '',
        telefono: an.telefono_principale || '',
        cellulare: an.cellulare_principale || '',
        email1: an.email_principale || '',
        email_ordini: an.email_ordini || '',
        email2: an.email2 || '',
        sdi: an.codice_sdi || '',
        pec: an.pec_fatturazione || an.pec || '',
        pec_fatturazione: an.pec_fatturazione || '',
        banca: an.banca || '',
        cin: an.cin || '',
        abi: an.abi || '',
        cab: an.cab || '',
        referente: an.referente || '',
        telefono_referente: an.telefono || '',
        cellulare_referente: an.cellulare_referente || '',
        email_referente: an.email || '',
        codice_cliente: an.codice || '',
        agente: ag.nome ? \`\${ag.nome} \${ag.cognome}\` : '',
        // Destinazione
        dest_nome: doc.indirizzo_destinazione ? an.ragione_sociale : '',
        dest_indirizzo: doc.indirizzo_destinazione || '',
        dest_cap: doc.cap_destinazione || '',
        dest_citta: doc.citta_destinazione || '',
        dest_provincia: doc.provincia_destinazione || '',
        dest_paese: 'Italia',
        dest_riferimenti: doc.riferimenti_destinazione || '',
        // Condizioni
        trasporto: doc.trasporto || '',
        resa: doc.resa || 'Franco fabbrica',
        imballo: an.tipo_imballo || 'Sì',
        condizioni_pagamento: an.condizioni_pagamento || '',
        validita_offerta: doc.validita_offerta || '30',
        settimana_consegna: doc.settimana_consegna || '',
        riferimento_cliente: doc.riferimento_cliente || '',
        // Sconto
        sconto1: doc.sconto1 || 0,
        sconto2: doc.sconto2 || 0,
        totale_imponibile: doc.totale_imponibile || 0,
        totale_netto: Math.round((doc.totale_imponibile||0)*(1-(doc.sconto1||0)/100)*(1-(doc.sconto2||0)/100)*100)/100,
        arrotondamento: doc.arrotondamento_euro || 0,
        totale_netto_arrotondato: doc.totale_arrotondato || 0,
      },
      righe: (righe||[]).map((r,i) => ({
        posizione: String(i+1).padStart(3,'0'),
        larghezza: r.larghezza_mm || '',
        altezza: r.altezza_mm || '',
        spessore: r.spessore_mm || r.spessore_muro_cm || '',
        senso: r.senso_apertura || '',
        apertura: r.nome_apertura || '',
        codice_apertura: r.codice_apertura || '',
        quantita: r.quantita || 1,
        um: 'NR',
        serie: r.nome_serie || '',
        modello: r.nome_modello || '',
        finitura: r.nome_finitura || '',
        tipologia: r.nome_apertura || '',
        senso_apertura: r.senso_apertura || '',
        spalla: r.codice_spalla || (r.spessore_muro_cm ? r.spessore_muro_cm+'cm' : ''),
        ferramenta: r.nome_ferramenta || '',
        serratura: r.nome_serratura || '',
        maniglia: r.nome_maniglia || '',
        versione_maniglia: '',
        colore_maniglia: r.nome_colore_maniglia || '',
        vetro: r.nome_tipo_vetro || '',
        bugna: r.pannello_bugna || '',
        colore_inserto: r.nome_colore_alu || r.nome_colore_pietra || '',
        note_riga: r.note_riga || '',
        // Prezzi
        prezzo_base: r.prezzo_base || 0,
        prezzo_finitura: r.prezzo_finitura || 0,
        prezzo_apertura: r.prezzo_apertura || 0,
        prezzo_telaio: r.prezzo_telaio || 0,
        prezzo_ferramenta: r.prezzo_ferramenta || 0,
        prezzo_maniglia: r.prezzo_maniglia || 0,
        prezzo_serratura: r.prezzo_serratura || 0,
        prezzo_vetro: r.prezzo_vetro || 0,
        prezzo_bugna: r.prezzo_bugna || 0,
        prezzo_extra: r.prezzo_extra_incisioni || 0,
        prezzo_unitario: r.prezzo_unitario || 0,
        prezzo_totale: r.prezzo_totale_riga || 0,
        totale_riga_netto: (() => {
          const sc = doc.sconto1 || 0;
          const tot = r.prezzo_totale_riga || r.prezzo_unitario || r.prezzo_base || 0;
          return tot ? Math.round(tot * (1 - sc/100) * 100) / 100 : 0;
        })(),
        sconto: doc.sconto1 || 0,
        // Kit obbligatori
        kit_varsavia: r.kit_varsavia || '',
        kit_rim16: r.kit_rim16 || '',
        fuori_misura_l: r.fuori_misura_l ? 'Sì' : '',
        fuori_misura_h: r.fuori_misura_h ? 'Sì' : '',
        immagine_url: r.immagine_url || '',
      }))
    };

    // Opzioni di esportazione
    payload.opzioni = {
      solo_netti: soloNetti
    };

    // Chiama il server per generare il PDF
    const resp = await fetch('/genera-pdf', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });

    if(!resp.ok){
      const err = await resp.text();
      toast('Errore generazione PDF: '+err, 'err');
      return;
    }

    // Download PDF
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`\${doc.numero}.pdf\`;
    a.click();
    URL.revokeObjectURL(url);
    toast('PDF scaricato: '+doc.numero, 'ok');

  } catch(e) {
    console.error('esportaPDF error:', e);
    toast('Errore: '+e.message, 'err');
  }
}
</script>

<!-- MODAL CONFIGURATORE PORTA -->
<div class="form-overlay" id="modal-cfg" style="background:rgba(0,0,0,0.75)">
  <div class="form-modal" style="width:min(820px,100%);max-height:90vh;display:flex;flex-direction:column">
    <div class="form-modal-head">
      <div style="display:flex;flex-direction:column;gap:6px;flex:1">
        <span class="form-modal-title">Configura il prodotto</span>
        <div id="cfg-stepper" style="display:flex;align-items:center;gap:4px;flex-wrap:wrap"></div>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="text-align:right">
          <div style="font-size:11px;color:rgba(255,255,255,0.5)">Prezzo unitario</div>
          <div id="cfg-prezzo-unitario" style="font-size:18px;font-weight:500;color:#fff">€ 0,00</div>
        </div>
        <button class="form-close" onclick="closeCfg()">×</button>
      </div>
    </div>
    <div id="cfg-body" style="padding:20px;overflow-y:auto;flex:1">
      <div class="loading"><div class="spinner"></div></div>
    </div>
    <div id="cfg-nav" style="display:none;padding:10px 20px;border-top:0.5px solid var(--border);justify-content:space-between;align-items:center;background:var(--white)">
      <span style="font-size:11px;color:var(--mid)">Modifica: clicca <strong>Avanti</strong> per scorrere le schede senza cambiare nulla</span>
      <button id="cfg-nav-avanti" class="btn btn-sm btn-red" onclick="cfgAvanti()">Avanti →</button>
    </div>
  </div>
</div>

<!-- MODAL NUOVO DOCUMENTO (preventivo o ordine diretto) -->
<div class="form-overlay" id="modal-nuovo-doc">
  <div class="form-modal" style="width:min(860px,100%);max-height:92vh;display:flex;flex-direction:column">
    <div class="form-modal-head">
      <span class="form-modal-title" id="ndoc-title">Nuovo preventivo</span>
      <button class="form-close" onclick="document.getElementById('modal-nuovo-doc').classList.remove('open')">×</button>
    </div>
    <div style="padding:18px 20px;overflow-y:auto;flex:1">
      <!-- Intestazione -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
        <div class="form-field">
          <label>Cliente <span class="req">*</span></label>
          <select id="ndoc-clienti" onchange="ndocClienteChange(this)">
            <option value="">Seleziona cliente...</option>
          </select>
        </div>
        <div class="form-field">
          <label>Agente Max Porte</label>
          <select id="ndoc-agenti"><option value="">Nessun agente</option></select>
        </div>
        <div class="form-field">
          <label>Listino</label>
          <select id="ndoc-listino" onchange="aggiornaTotaleNdoc()">
            <option value="A">Listino A</option>
            <option value="P">Listino P (Piemonte/VdA)</option>
          </select>
        </div>
        <div class="form-field">
          <label>Trasporto</label>
          <select id="ndoc-trasporto">
            <option value="Max Porte">A cura Max Porte</option>
            <option value="Cliente">A cura del cliente</option>
            <option value="Vettore">A cura del vettore</option>
          </select>
        </div>
        <div class="form-field">
          <label>Resa</label>
          <select id="ndoc-resa">
            <option value="Franco fabbrica">Franco fabbrica</option>
            <option value="Franco destino">Franco destino</option>
            <option value="EXW">EXW — Ex Works</option>
            <option value="DAP">DAP — Delivered at Place</option>
            <option value="DDP">DDP — Delivered Duty Paid</option>
          </select>
        </div>
        <div class="form-field" style="grid-column:1/-1">
          <label>Riferimento cliente</label>
          <input type="text" id="ndoc-rif-cliente" placeholder="Es: ordine n° 123, progetto Rossi...">
        </div>
        <div class="form-field">
          <label>Sconto 1 (%)</label>
          <input type="number" id="ndoc-sconto1" value="0" min="0" max="100" step="0.5" oninput="aggiornaTotaleNdoc()">
        </div>
        <div class="form-field">
          <label>Sconto 2 (%) — doppio sconto</label>
          <input type="number" id="ndoc-sconto2" value="0" min="0" max="100" step="0.5" oninput="aggiornaTotaleNdoc()">
        </div>
      </div>
      <!-- Destinazione merce -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;color:var(--mid)">Destinazione merce</div>
        <button type="button" class="btn btn-sm" onclick="usaIndirizzoCliente()" style="font-size:11px">Usa indirizzo cliente</button>
      </div>
      <div style="display:grid;grid-template-columns:2.6fr 0.9fr 1.6fr 0.7fr;gap:10px;margin-bottom:16px">
        <div class="form-field"><label>Indirizzo</label><input type="text" id="ndoc-ind" placeholder="Via/Piazza..."></div>
        <div class="form-field"><label>CAP</label><input type="text" id="ndoc-cap" maxlength="5"></div>
        <div class="form-field"><label>Città</label><input type="text" id="ndoc-cit"></div>
        <div class="form-field"><label>Prov.</label><select id="ndoc-prv"></select></div>
      </div>
      <!-- Note -->
      <div class="form-field" style="margin-bottom:16px">
        <label>Note</label>
        <textarea id="ndoc-note" placeholder="Note per il cliente..." style="min-height:50px"></textarea>
      </div>
      <!-- Porte aggiunte -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div style="font-size:13px;font-weight:500">Porte configurate</div>
        <button class="btn btn-red btn-sm" onclick="ndocAggiungiPorta()">+ Aggiungi porta</button>
      </div>
      <div id="ndoc-righe-list" style="min-height:60px;border:0.5px solid var(--border);border-radius:var(--radius);padding:8px 12px;margin-bottom:14px"></div>
    </div>
    <div class="form-modal-foot" style="justify-content:space-between">
      <div>
        <div style="font-size:11px;color:var(--mid)">Totale netto stimato:</div>
        <div id="ndoc-totale" style="font-size:20px;font-weight:500;color:var(--red)">€ 0,00</div>
        <div id="ndoc-sconto-detail"></div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn" onclick="document.getElementById('modal-nuovo-doc').classList.remove('open')">Annulla</button>
        <button class="btn btn-red" onclick="salvaNuovoDoc()">Salva</button>
      </div>
    </div>
  </div>
</div>


<!-- MODAL CONFIGURATORE PORTA -->



</body>
</html>
<div id="modal-regola" class="form-modal-overlay">
  <div class="form-modal" style="max-width:600px">
    <div class="form-modal-head"><span class="form-modal-title" id="modal-regola-title">Regola</span>
      <button class="form-close" onclick="closeForm('modal-regola')">&times;</button></div>
    <div class="form-modal-body" id="modal-regola-body"></div>
    <div class="form-modal-foot">
      <button class="btn" onclick="closeForm('modal-regola')">Annulla</button>
      <button class="btn btn-red" onclick="salvaRegola()">Salva</button></div>
  </div>
</div>
<div id="modal-distinta" class="form-modal-overlay" style="z-index:10000">
  <div class="form-modal" style="max-width:800px">
    <div class="form-modal-head"><span class="form-modal-title">Anteprima distinta</span>
      <button class="form-close" onclick="closeForm('modal-distinta')">&times;</button></div>
    <div class="form-modal-body" id="modal-distinta-body" style="max-height:70vh;overflow-y:auto"></div>
    <div class="form-modal-foot">
      <button class="btn" onclick="closeForm('modal-distinta')">Chiudi</button></div>
  </div>
</div>
`;
function generaPDF(payload, callback) {
  const tmpJson = path.join(os.tmpdir(), 'prev_' + Date.now() + '.json');
  const tmpPdf = path.join(os.tmpdir(), 'prev_' + Date.now() + '.pdf');
  try { fs.writeFileSync(tmpJson, JSON.stringify(payload)); } catch(e) { return callback(new Error('Scrittura JSON: ' + e.message)); }
  const scriptPath = path.join(__dirname, 'genera_pdf.py');
  if (!fs.existsSync(scriptPath)) { return callback(new Error('genera_pdf.py non trovato')); }
  const proc = spawn('python3', [scriptPath, tmpJson, tmpPdf]);
  let stderr = '';
  proc.stderr.on('data', function(d) { stderr += d.toString(); });
  proc.on('error', function(err) { callback(new Error('spawn: ' + err.message)); });
  proc.on('close', function(code) {
    try { fs.unlinkSync(tmpJson); } catch(e) {}
    if (code === 0 && fs.existsSync(tmpPdf)) {
      const pdfData = fs.readFileSync(tmpPdf);
      try { fs.unlinkSync(tmpPdf); } catch(e) {}
      callback(null, pdfData);
    } else { callback(new Error('Python exit ' + code + ': ' + stderr.slice(-500))); }
  });
}
// RESEND
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const MAIL_FROM = '"Max Porte" <commerciale@maxporte.it>';

function inviaConResend({to, cc, subject, text, attachmentName, attachmentData}, callback) {
  const body = JSON.stringify({
    from: MAIL_FROM,
    to: Array.isArray(to) ? to : [to],
    ...(cc ? {cc: Array.isArray(cc) ? cc : [cc]} : {}),
    subject,
    text,
    attachments: [{
      filename: attachmentName,
      content: attachmentData.toString('base64'),
    }]
  });

  const options = {
    hostname: 'api.resend.com',
    path: '/emails',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + RESEND_API_KEY,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    }
  };

  const req = https.request(options, function(r) {
    let data = '';
    r.on('data', function(c) { data += c; });
    r.on('end', function() {
      if (r.statusCode >= 200 && r.statusCode < 300) {
        callback(null);
      } else {
        callback(new Error('Resend error ' + r.statusCode + ': ' + data));
      }
    });
  });
  req.on('error', callback);
  req.write(body);
  req.end();
}

const server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/logo-maxporte.png') {
    const p = path.join(__dirname, 'logo-maxporte.png');
    if (fs.existsSync(p)) { res.writeHead(200, {'Content-Type':'image/png','Cache-Control':'public,max-age=86400'}); res.end(fs.readFileSync(p)); }
    else { res.writeHead(404); res.end('Not found'); }
    return;
  }
  if (req.method === 'POST' && req.url === '/genera-pdf') {
    let body = '';
    req.on('data', function(chunk) { body += chunk.toString(); });
    req.on('end', function() {
      try {
        const payload = JSON.parse(body);
        generaPDF(payload, function(err, pdfData) {
          if (err) { console.error('generaPDF error:', err.message); res.writeHead(500, {'Content-Type':'text/plain'}); res.end(err.message); }
          else {
            const numero = (payload.documento && payload.documento.numero) || 'documento';
            res.writeHead(200, {'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="'+numero+'.pdf"','Content-Length':pdfData.length});
            res.end(pdfData);
          }
        });
      } catch(e) { res.writeHead(400,{'Content-Type':'text/plain'}); res.end('JSON: '+e.message); }
    });
    return;
  }
  if(req.method==='POST'&&req.url==='/invia-preventivo'){
    let body='';
    req.on('data',function(c){body+=c.toString();});
    req.on('end',function(){
      try{
        const d=JSON.parse(body);
        generaPDF(d.payload,function(err,pdf){
          if(err){res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,error:err.message}));return;}
          inviaConResend({
            to:d.email_to, cc:d.email_cc||'',
            subject:d.oggetto, text:d.testo,
            attachmentName:d.numero_preventivo+'.pdf', attachmentData:pdf
          },function(e2){
            if(e2){res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,error:e2.message}));}
            else{res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:true}));}
          });
        });
      }catch(e){res.writeHead(400,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,error:e.message}));}
    });
    return;
  }
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store'});
  res.end(HTML);
});
server.listen(PORT, function() { console.log('MPX Gestionale avviato su porta ' + PORT); });