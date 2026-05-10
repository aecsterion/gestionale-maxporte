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
        <img src="data:image/png;base64,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" alt="Max Porte" style="width:44px;height:44px;object-fit:contain;flex-shrink:0">
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
      <svg class="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h12l-1.5 7H3.5L2 3z"/><circle cx="6" cy="13" r="1"/><circle cx="11" cy="13" r="1"/></svg>
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
        <div class="form-field"><label>Categoria</label><select id="mag-categoria" onchange="aggiornaCodiceMP()"><option value="">&#8212;</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-field"><label>Finitura</label><select id="mag-codice_finitura" onchange="aggiornaFinMag(this);aggiornaCodiceMP()"><option value="">&#8212; Nessuna &#8212;</option></select></div>
        <div class="form-field"><label>Unit&#224;</label><select id="mag-unita">
          <option value="pz">pz</option><option value="m">m</option>
          <option value="m2">m&#178;</option><option value="kg">kg</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
        <div class="form-field"><label>Altezza (mm)</label><input id="mag-altezza_mm" type="number" oninput="aggiornaCodiceMP()"></div>
        <div class="form-field"><label>Larghezza (mm)</label><input id="mag-larghezza_mm" type="number" oninput="aggiornaCodiceMP()"></div>
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
  ordini_vendita:{title:"Conferme d'ordine",bc:'Ordini senza preventivo',action:false,label:''},
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
    sede_op_indirizzo:v('ana-so-indirizzo')||null,sede_op_cap:v('ana-so-cap')||null,sede_op_citta:v('ana-so-citta')||null,
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
      spessore:r.spessore_muro_mm||(r.spessore_muro_cm?r.spessore_muro_cm*10:''),
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
async function renderMagazzino(){
  const {data:cats}=await sb.from(\'categorie_magazzino\').select(\'*\').order(\'nome\');
  const {data}=await sb.from(\'magazzino\').select(\'*\').order(\'categoria\').order(\'descrizione\');
  const items=data||[];
  const sottoscorta=items.filter(function(m){return Number(m.giacenza||0)<=Number(m.scorta_minima||0);}).length;
  const pannelli=items.filter(function(m){return m.categoria===\'pannello_blindato\';}).length;
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
      \'<td>\'+(s?\'<span class="badge br">Sotto scorta</span>\':\'<span class="badge bg">OK</span>\')+\'</td></tr>\';
  }).join(\'\');
  document.getElementById(\'main-content\').innerHTML=
    \'<div class="grid-4" style="margin-bottom:16px">\'+
    \'<div class="metric"><div class="metric-label">Articoli totali</div><div class="metric-value">\'+items.length+\'</div></div>\'+
    \'<div class="metric"><div class="metric-label">Pannelli blindati</div><div class="metric-value">\'+pannelli+\'</div></div>\'+
    \'<div class="metric"><div class="metric-label">Sotto scorta</div><div class="metric-value" style="color:var(--red)">\'+sottoscorta+\'</div></div>\'+
    \'</div><div class="card"><div class="card-header"><span class="card-title">Magazzino</span>\'+
    \'<button class="btn btn-red btn-sm" onclick="apriNuovoArticoloMag()">+ Nuovo articolo</button></div>\'+
    \'<table><thead><tr><th>Codice MP</th><th>Descrizione</th><th>Categoria</th><th>Finitura</th>\'+
    \'<th>Dim.</th><th>Giacenza</th><th>Scorta min.</th><th>Stato</th></tr></thead>\'+
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
  // Carica finiture
  const {data:fins}=await sb.from(\'finiture\').select(\'codice_finitura,nome_finitura\').order(\'nome_finitura\');
  const finsUnique=[];const finsSet=new Set();
  (fins||[]).forEach(function(f){if(!finsSet.has(f.codice_finitura)){finsSet.add(f.codice_finitura);finsUnique.push(f);}});
  const finSel=document.getElementById(\'mag-codice_finitura\');
  if(finSel){
    finSel.innerHTML=\'<option value="">&#8212; Nessuna &#8212;</option>\'+
      finsUnique.map(function(f){return \'<option value="\'+f.codice_finitura+\'" data-nome="\'+f.nome_finitura+\'"\'+(m.codice_finitura===f.codice_finitura?\' selected\':\'\')+\'>\'+f.codice_finitura+\' - \'+f.nome_finitura+\'</option>\';}).join(\'\');
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
  const h=document.getElementById(\'mag-altezza_mm\')?.value||\'\';
  const l=document.getElementById(\'mag-larghezza_mm\')?.value||\'\';
  const s=document.getElementById(\'mag-spessore_mm\')?.value||\'\';
  const fin=document.getElementById(\'mag-codice_finitura\')?.value||\'\';
  const parts=[cat,h,l,s,fin].filter(Boolean);
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
      \'<button class="btn btn-sm" data-fid="\'+f.id+\'" onclick="eliminaFornitore(this.dataset.fid)">\xc3\x97</button></div>\';
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

function resetCFG(){
  CFG = {
    serie:null, modello:null, finitura:null, colore_speciale:null,
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
    _p_misura:0, _pct_misura:0
  };
}
resetCFG();

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
    (CFG._p_varsavia||0)
  )*100)/100;
}

function listino(){ return window._prevListino || 'A'; }

function cfgUpdatePrice(){
  const tot = cfgTotale();
  const el = document.getElementById('cfg-prezzo-unitario');
  if(el) el.textContent = '€ '+tot.toLocaleString('it-IT',{minimumFractionDigits:2,maximumFractionDigits:2});
  const qty = parseInt(document.getElementById('cfg-qty')?.value||1)||1;
  const elTot = document.getElementById('cfg-prezzo-totale');
  if(elTot) elTot.textContent = '€ '+(tot*qty).toLocaleString('it-IT',{minimumFractionDigits:2,maximumFractionDigits:2});
}

// ── MODAL CONFIGURATORE ───────────────────────────────
function openConfiguratore(mode, targetId, listino_in){
  CFG_MODE = mode;
  CFG_TARGET_ID = targetId;
  window._prevListino = listino_in || 'A';
  resetCFG();
  renderCfgStep('serie');
  const el = ensureModalInBody('modal-cfg');
  el.classList.add('open');
}

function closeCfg(){
  document.getElementById('modal-cfg').classList.remove('open');
}

async function renderCfgStep(step){
  const body = document.getElementById('cfg-body');
  body.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  updateCfgStepper(step);

  if(step==='serie') await cfgSerie();
  else if(step==='modello') await cfgModello();
  else if(step==='finitura') await cfgFinitura();
  else if(step==='colore_speciale') await cfgColoreSpeciale();
  else if(step==='opzioni') await cfgOpzioni();
  else if(step==='apertura') await cfgApertura();
  else if(step==='serratura') await cfgSerratura();
  else if(step==='cilindro') await cfgCilindro();
  else if(step==='misure') await cfgMisure();
  else if(step==='spessore') await cfgSpessore();
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

const CFG_STEPS = ['serie','modello','finitura','opzioni','apertura','serratura','misure','spessore','ferramenta','maniglia','riepilogo'];
const CFG_LABELS = {serie:'Serie',modello:'Modello',finitura:'Finitura',opzioni:'Opzioni',apertura:'Apertura',misure:'Misure',spessore:'Spessore muro',ferramenta:'Ferramenta',riepilogo:'Riepilogo'};

// Step accessori
const CFG_ACC_STEPS = {
  passata:    ['serie','modello','finitura','acc_misure','acc_spessore','riepilogo'],
  sopraluce:  ['serie','modello','finitura','acc_sopraluce','acc_spessore','riepilogo'],
  semplice:   ['serie','modello','finitura','acc_qta','riepilogo'],
  coprifilo:  ['serie','modello','finitura','acc_qta','riepilogo'],
  pannello:   ['serie','modello','finitura','acc_pannello','riepilogo'],
};
const CFG_ACC_LABELS = {
  acc_misure:'Misure', acc_sopraluce:'Misure', acc_qta:'Quantità',
  acc_pannello:'Configurazione', acc_spessore:'Spessore muro'
};

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
  CFG.serie=cod; CFG.nome_serie=nome;
  CFG.modello=null; CFG.finitura=null;
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

  // Quantità minima per certi accessori
  const QTA_MIN = {'FPAN':3,'IMB':3,'AL100':3,'AL230':3};
  CFG._qtaMin = QTA_MIN[cod] || 1;

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
  const {data:tutteFiniture} = await sb.from('finiture')
    .select('*')
    .eq('codice_serie',CFG.serie)
    .or(\`codice_modello.is.null,codice_modello.eq.\${CFG.modello}\`)
    .eq('attiva',true)
    .order('fascia').order('nome_finitura');

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
    'MP CLASSIC': {bg:'var(--beige2)',tx:'var(--dark)',icon:'⬜'},
    'MP LIGHT':   {bg:'#E8F4FD',tx:'#1A5276',icon:'🔵'},
    'MP PREMIUM': {bg:'#FDF3E7',tx:'#784212',icon:'🟡'},
    '': {bg:'transparent',tx:'var(--mid)',icon:''},
  };

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
  cfgUpdatePrice();

  // Flusso accessori
  if(CFG._isAccessorio){
    const t = CFG._tipoAccessorio;
    if(t==='passata') return await renderCfgStep('acc_misure');
    if(t==='sopraluce') return await renderCfgStep('acc_sopraluce');
    if(t==='semplice'||t==='coprifilo') return await renderCfgStep('acc_qta');
  }
  if(CFG._isPannelloBlindato) return await renderCfgStep('acc_pannello');

  // Flusso porte normale
  const f = CFG._flags||{};
  const haOpzioni = f.ha_vetro||f.ha_pannello_o_bugna||f.ha_inserto_alluminio||f.ha_inserto_pietra||f.ha_pantografatura;
  await renderCfgStep(haOpzioni?'opzioni':'apertura');
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
  cfgUpdatePrice();
  const f = CFG._flags||{};
  const haOpzioni = f.ha_vetro||f.ha_pannello_o_bugna||f.ha_inserto_alluminio||f.ha_inserto_pietra||f.ha_pantografatura;
  await renderCfgStep(haOpzioni?'opzioni':'apertura');
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
  // Reset serratura quando cambia apertura
  CFG.serratura=null; CFG.nome_serratura=''; CFG.cilindro=null; CFG.nome_cilindro='';
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

// Determina famiglia serie per COM/FM
function famigliaSerie(){
  const s=CFG.serie||'';
  const f=CFG.finitura||'';
  if(f==='GREZZA') return 'GREZZA';
  if(['LAC','GEO','GL','JAD','ACC','PAN-BL'].includes(s)) return 'LACCATA';
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
        \${larghezze.map(l=>\`<div onclick="selLarghezza(\${l})" style="padding:6px 12px;border-radius:var(--radius);border:\${CFG.larghezza===l?'2px solid var(--red)':'0.5px solid var(--border)'};cursor:pointer;font-size:13px;font-weight:500;background:\${CFG.larghezza===l?'var(--red-bg)':'var(--white)'};">\${l}</div>\`).join('')}
      </div>
    </div>
    <div>
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Altezza (mm)</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        \${altezze.map(a=>\`<div onclick="selAltezza(\${a})" style="padding:6px 12px;border-radius:var(--radius);border:\${CFG.altezza===a?'2px solid var(--red)':'0.5px solid var(--border)'};cursor:pointer;font-size:13px;font-weight:500;background:\${CFG.altezza===a?'var(--red-bg)':'var(--white)'};">\${a}</div>\`).join('')}
      </div>
    </div>
  </div>
  <div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--amber-tx);margin-bottom:12px">
    Misura non presente nell'elenco? Inseriscila manualmente — verrà marcata come <strong>misura custom</strong> e richiederà approvazione tecnica.
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px">
    <div>
      <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Larghezza custom (mm)</div>
      <input type="number" id="cfg-larg-custom" placeholder="es. 870" min="300" max="3000" style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="selLarghezzaCustom(this.value)">
    </div>
    <div>
      <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Altezza custom (mm)</div>
      <input type="number" id="cfg-alt-custom" placeholder="es. 2100" min="1000" max="4000" style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="selAltezzaCustom(this.value)">
    </div>
  </div>
  \${CFG.misura_custom?'<div style="background:var(--red-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--red-tx);margin-bottom:12px">⚠ Misura custom — richiederà approvazione tecnica</div>':''}
  <div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--amber-tx);margin-bottom:12px">
    <strong>Fuori misura:</strong> larghezze non in elenco → +40% · altezze non in elenco → +20% (o €45 per CL/LCL) · h&gt;210cm solo laccate con scorrevole/FM
  </div>
  <div style="display:flex;justify-content:flex-end">
    <button class="btn btn-red btn-sm" onclick="avanzaASpessore()">Avanti →</button>
  </div>\`;
  document.getElementById('cfg-body').innerHTML=html;
}

function selLarghezza(v){ 
  CFG.larghezza=v; CFG.misura_custom=false;
  // Trova sovrapprezzo misura se altezza già selezionata
  aggiornaSuprMisura(window._cfgMisureCorrente||[]); 
  cfgMisure(); 
}
function selAltezza(v){ 
  CFG.altezza=v; CFG.misura_custom=false;
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
function selLarghezzaCustom(v){ if(v){ CFG.larghezza=parseFloat(v); CFG.misura_custom=true; CFG._p_misura=0; CFG._pct_misura=0; } }
function selAltezzaCustom(v){ if(v){ CFG.altezza=parseFloat(v); CFG.misura_custom=true; CFG._p_misura=0; CFG._pct_misura=0; } }
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
  const isLaccata = ['LAC','GEO','GL','JAD','ACC','PAN-BL'].includes(CFG.serie||'');
  const isMassellata = CFG.serie==='MAS';
  const isModelloCLLCL = ['CL','LCL'].includes(CFG.modello||'');
  const isScorrevole = ['SI','SE'].some(x=>(CFG.apertura||'').startsWith(x));
  const isFM = (CFG.apertura||'').startsWith('FM');

  // Validazione h>210 — solo laccati con scorrevole o FM
  if(isFuoriH && CFG.altezza>210){
    if(!isLaccata){
      toast('Altezza >210cm disponibile solo per porte laccate con tipologia scorrevole o filo muro','err');
      return;
    }
    if(!isScorrevole && !isFM){
      toast('Altezza >210cm disponibile solo con tipologia scorrevole o filo muro','err');
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

  let html=\`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
    <div style="font-size:13px;font-weight:500">Spessore muro e telaio <span style="color:var(--mid);font-weight:400">— \${CFG.larghezza}×\${CFG.altezza} mm \${CFG.senso}</span></div>
    <button class="btn btn-sm" onclick="renderCfgStep('misure')">← Indietro</button>
  </div>
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
  <div style="display:flex;justify-content:flex-end">
    <button class="btn btn-red btn-sm" onclick="avanzaAFerramenta()">Avanti →</button>
  </div>\`;
  document.getElementById('cfg-body').innerHTML=html;
  if(CFG.spessore) calcolaTelaio(CFG.spessore, fam);
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
  if(!CFG.spessore){ toast('Inserisci lo spessore del muro','err'); return; }
  renderCfgStep('ferramenta');
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
  const qta = CFG.quantita||qMin;
  document.getElementById('cfg-body').innerHTML=\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Quantità <span style="color:var(--mid);font-weight:400">— \${CFG.nome_modello}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('finitura')">← Indietro</button>
    </div>
    <div style="display:grid;gap:14px;max-width:280px">
      \${qMin>1?\`<div style="background:var(--beige2);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--mid)">Quantità minima: <strong style="color:var(--dark)">\${qMin} pz</strong></div>\`:''}
      <div>
        <label style="font-size:12px;color:var(--mid);display:block;margin-bottom:4px">Quantità (minimo \${qMin} pz)</label>
        <input type="number" id="acc-qta" value="\${qta}" min="\${qMin}" step="1"
          style="width:100%;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:18px;font-weight:600;text-align:center">
      </div>
      <button class="btn btn-red" onclick="selAccQta()">Avanti →</button>
    </div>\`;
}

function selAccQta(){
  const q = parseInt(document.getElementById('acc-qta')?.value||0);
  const qMin = CFG._qtaMin||1;
  if(!q||q<qMin){toast(\`Quantità minima: \${qMin} pz\`,'err');return;}
  if(q!==Math.floor(q)||isNaN(q)){toast('Inserisci un numero intero','err');return;}
  CFG.quantita=q;
  cfgUpdatePrice(); cfgRiepilogo();
}

// Pannello blindato: senso apertura + misure + intero/taglio a misura
async function cfgAccPannello(){
  const {data:imp}=await sb.from(\'impostazioni\').select(\'valore\').eq(\'chiave\',\'supplemento_taglio_pannello\').maybeSingle();
  CFG._suppTaglioPannello=parseFloat(imp?.valore||0);
  const {data:magP}=await sb.from(\'magazzino\')
    .select(\'altezza_mm,larghezza_mm,giacenza\')
    .eq(\'categoria\',\'pannello_blindato\').eq(\'codice_finitura\',CFG.finitura||\'\').order(\'altezza_mm\',{ascending:false});
  CFG._panMag=magP?.[0]||null;
  const hMag=CFG._panMag?.altezza_mm||0;
  const lMax=CFG._panMag?.larghezza_mm||0;
  const sensi=[\'Interno DX\',\'Esterno DX\',\'Interno SX\',\'Esterno SX\',\'Nessuno\'];
  const sensoSel=CFG.senso||\'\' ;
  const infoMag=CFG._panMag
    ?\'<div style="background:var(--beige);border-radius:var(--radius);padding:10px 14px;font-size:12px;margin-bottom:14px;border:0.5px solid var(--border)">\'+
      \'<strong>Pannello a magazzino:</strong> \'+hMag+\' x \'+lMax+\' mm\'+
      (CFG._panMag.giacenza!=null?\' \xe2\x80\x94 Giacenza: <strong>\'+CFG._panMag.giacenza+\' pz</strong>\':\'\')+\'</div>\'
    :\'<div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 14px;font-size:12px;margin-bottom:14px;color:var(--amber-tx)">\'+
      \'Nessun pannello in magazzino per la finitura <strong>\'+( CFG.finitura||\'\' )+\'</strong>.</div>\';
  document.getElementById(\'cfg-body\').innerHTML=\\`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500">Configurazione pannello <span style="color:var(--mid);font-weight:400">\\xe2\\x80\\x94 \\${CFG.nome_modello}</span></div>
      <button class="btn btn-sm" onclick="renderCfgStep('finitura')">\\xe2\\x86\\x90 Indietro</button>
    </div>
    \\${infoMag}
    <div style="display:grid;gap:14px;max-width:440px">
      <div>
        <label style="font-size:12px;color:var(--mid);display:block;margin-bottom:6px">Senso apertura</label>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px" id="sensi-grid">
          \\${sensi.map(s=>\\`<div onclick="selSensoPannello('\\${s}')" id="senso-\\${s.replace(/ /g,'-')}"
            style="padding:8px;border-radius:var(--radius);border:\\${s===sensoSel?'2px solid var(--red)':'0.5px solid var(--border)'};cursor:pointer;text-align:center;font-size:12px;background:\\${s===sensoSel?'var(--red-bg)':'var(--white)'};color:\\${s===sensoSel?'var(--red)':'var(--dark)'}">\\${s}</div>\\`).join('')}
        </div>
        <input type="hidden" id="pannello-senso" value="\\${sensoSel}">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <label style="font-size:12px;color:var(--mid);display:block;margin-bottom:4px">Larghezza (mm)\\${lMax?' \\xe2\\x80\\x94 max '+lMax+' mm':''}</label>
          <input type="number" id="pan-l" value="\\${CFG.larghezza||\'\'}" placeholder="es. 900"
            style="width:100%;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px"
            oninput="checkLarghezzaPan(this.value)">
          <div id="pan-l-warn" style="font-size:11px;color:var(--red);margin-top:3px;display:none">Supera il massimo disponibile</div>
        </div>
        <div>
          <label style="font-size:12px;color:var(--mid);display:block;margin-bottom:4px">Altezza richiesta (mm)</label>
          <input type="number" id="pan-a" value="\\${CFG.altezza||\''}" placeholder="es. 2200"
            style="width:100%;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px"
            oninput="aggiornaZoccoliPreview(this.value)">
        </div>
      </div>
      <div id="zoccoli-preview"></div>
      <button class="btn btn-red" onclick="selAccPannello()">Avanti \\xe2\\x86\\x92</button>
    </div>\\`;
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
      \'\xe2\x9c\x93 Taglio diretto: pannello H \'+hMag+\' mm \xe2\x86\x92 <strong>\'+h+\' mm</strong></div>\';
  } else {
    let z=0;
    while(hMag+z*80<h) z++;
    const hT=h-z*80;
    if(hT<=0){
      el.innerHTML=\'<div style="background:var(--red-bg);border-radius:var(--radius);padding:10px 12px;font-size:12px;color:var(--red)">Altezza non raggiungibile.</div>\';
    } else {
      el.innerHTML=\'<div style="background:var(--amber-bg);border-radius:var(--radius);padding:10px 12px;font-size:12px;color:var(--amber-tx)">\'+
        \'<strong>\'+z+\' zoccolo\'+( z>1?\'li\':\'\')+\'</strong> da 80 mm \xe2\x80\x94 \'+
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
  CFG.senso=senso;
  CFG.larghezza=l;
  CFG.altezza=a;
  CFG.misura_custom=true;
  CFG.p_extra=CFG._suppTaglioPannello||0;
  // Calcola zoccoli
  CFG._zoccoliAuto=0;
  CFG._hTaglioPannello=a;
  CFG._hMagPannello=hMag;
  if(hMag>0&&a>hMag){
    let z=0;
    while(hMag+z*80<a) z++;
    const hT=a-z*80;
    if(hT<=0){toast(\'Altezza non raggiungibile con i pannelli disponibili\',\'err\');return;}
    CFG._zoccoliAuto=z;
    CFG._hTaglioPannello=hT;
  }
  cfgUpdatePrice();
  cfgRiepilogo();
}
;