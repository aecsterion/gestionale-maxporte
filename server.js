const http=require('http');
const PORT=process.env.PORT||3000;
const HTML=`<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Max Porte — Gestionale</title>
<!-- MAXPORTE-BUILD-v24APR2026 -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
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
.form-modal{background:var(--white);border-radius:var(--radius-lg);width:100%;max-width:680px;overflow:hidden;margin:auto;box-sizing:border-box}
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
      <img src="data:image/png;base64,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" alt="Max Porte" style="width:72px;height:72px;object-fit:contain">
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
            <label>Email</label>
            <input type="email" id="ana-email" placeholder="info@azienda.it">
          </div>
          <div class="form-field">
            <label>Telefono</label>
            <input type="tel" id="ana-telefono" placeholder="+39 011 123456">
          </div>
        </div>
        <div class="form-field" style="margin-bottom:10px">
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

<!-- FORM ORDINE -->
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
    confermato:'bb',in_produzione:'ba',spedito:'bg',ritardo:'br',annullato:'bgr',
    emessa:'bb',pagata:'bg',scaduta:'br','in_scadenza':'ba',
    presente:'bg',ferie:'ba',malattia:'br',
    pianificato:'bb','in_corso':'ba',completato:'bg'};
  const labels={attivo:'Attivo',dormiente:'Dormiente',prospect:'Prospect',nuovo:'Nuovo',
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
    'ana-referente':data?.referente||'','ana-email':data?.email||'','ana-email-ordini':data?.email_ordini||'','ana-telefono':data?.telefono||'',
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
  // Sezioni che variano per tipo
  const isCliente = tipo==='cliente'||tipo==='entrambi';
  const isFornitore = tipo==='fornitore'||tipo==='entrambi';

  // Sezione "Solo fornitori" nel tab commerciale
  const fornSection = document.getElementById('ana-section-fornitore');
  if(fornSection) fornSection.style.display = isFornitore ? 'block' : 'none';

  // Sezione agente e sconti — solo per clienti
  const clienteSection = document.getElementById('ana-section-cliente');
  if(clienteSection) clienteSection.style.display = isCliente ? 'block' : 'none';

  // SDI e fatturazione — sempre visibile ma etichetta cambia
  const sdiLabel = document.getElementById('ana-sdi-label');
  if(sdiLabel) sdiLabel.textContent = isFornitore&&!isCliente ? 'Codice SDI fornitore' : 'Codice SDI';
}

async function editAnagrafica(id){
  const {data} = await sb.from('anagrafiche').select('*').eq('id',id).single();
  if(data) openFormAnagrafica(data);
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
    referente:v('ana-referente')||null,email:v('ana-email')||null,email_ordini:v('ana-email-ordini')||null,telefono:v('ana-telefono')||null,
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
  const {data} = await sb.from('magazzino').select('*,anagrafiche(ragione_sociale)').order('codice');
  const rows=(data||[]).map(m=>{
    const sotto=Number(m.giacenza)<=Number(m.scorta_minima);
    return \`<tr class="data-row">
      <td><strong>\${m.codice||'—'}</strong></td>
      <td>\${m.descrizione||'—'}</td>
      <td>\${m.categoria?\`<span class="tag">\${m.categoria}</span>\`:'—'}</td>
      <td>\${m.giacenza||0} \${m.unita||''}</td>
      <td>\${m.scorta_minima||0} \${m.unita||''}</td>
      <td>\${m.ubicazione||'—'}</td>
      <td>\${m.anagrafiche?.ragione_sociale||'—'}</td>
      <td>\${sotto?'<span class="badge br">Sotto scorta</span>':'<span class="badge bg">OK</span>'}</td>
    </tr>\`;}).join('');
  const sottoscorta=(data||[]).filter(m=>Number(m.giacenza)<=Number(m.scorta_minima)).length;
  document.getElementById('main-content').innerHTML=\`
  <div class="grid-4" style="margin-bottom:16px">
    <div class="metric"><div class="metric-label">Articoli totali</div><div class="metric-value">\${(data||[]).length}</div></div>
    <div class="metric"><div class="metric-label">Sotto scorta minima</div><div class="metric-value" style="color:var(--red)">\${sottoscorta}</div></div>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Giacenze magazzino</span></div>
    <table>
      <thead><tr><th>Codice</th><th>Descrizione</th><th>Cat.</th><th>Giacenza</th><th>Scorta min.</th><th>Ubicazione</th><th>Fornitore</th><th>Stato</th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:24px;font-style:italic">Nessun articolo ancora</td></tr>'}</tbody>
    </table>
  </div>\`;
}

// ── PRODUZIONE ────────────────────────────────────────
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
    _fuori_h_pct:0, _fuori_l_pct:0, _p_varsavia:0
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
    tot_porta + p_fh + p_fl +
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
  else if(step==='riepilogo') await cfgRiepilogo();
}

const CFG_STEPS = ['serie','modello','finitura','opzioni','apertura','serratura','misure','spessore','ferramenta','maniglia','riepilogo'];
const CFG_LABELS = {serie:'Serie',modello:'Modello',finitura:'Finitura',opzioni:'Opzioni',apertura:'Apertura',misure:'Misure',spessore:'Spessore muro',ferramenta:'Ferramenta',riepilogo:'Riepilogo'};

function updateCfgStepper(current){
  const idx = CFG_STEPS.indexOf(current);
  const el = document.getElementById('cfg-stepper');
  if(!el) return;
  el.innerHTML = CFG_STEPS.map((s,i)=>\`
    <div style="display:flex;align-items:center;gap:4px;font-size:11px;
      color:\${i<idx?'var(--green-tx)':i===idx?'var(--red)':'var(--mid)'}">
      <div style="width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;flex-shrink:0;
        background:\${i<idx?'var(--green-bg)':i===idx?'var(--red)':'var(--border)'};
        color:\${i<idx?'var(--green-tx)':i===idx?'#fff':'var(--mid)'}">
        \${i<idx?'✓':i+1}</div>
      <span style="display:\${i===idx?'inline':'none'}">\${CFG_LABELS[s]}</span>
    </div>
    \${i<CFG_STEPS.length-1?'<div style="width:16px;height:1px;background:var(--border);flex-shrink:0"></div>':''}\`
  ).join('');
}

async function cfgSerie(){
  const {data} = await sb.from('serie').select('*').eq('attiva',true).order('nome');
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
  await renderCfgStep('finitura');
}

// ── SISTEMA UNIVERSALE COMPATIBILITÀ ─────────────────
// Carica tutte le esclusioni per le scelte correnti del configuratore
// Logica CUMULATIVA: un'opzione viene esclusa se ALMENO UNA delle scelte precedenti la esclude
let _compatCache = null; // cache per evitare query ripetute nello stesso step

async function caricaEsclusioni(){
  // Costruisce lista di tutte le entità già scelte
  const scelte = [];
  if(CFG.serie)    scelte.push({tipo:'serie',    codice:CFG.serie});
  if(CFG.modello)  scelte.push({tipo:'modello',  codice:CFG.modello});
  if(CFG.finitura) scelte.push({tipo:'finitura', codice:CFG.finitura});
  if(CFG.apertura) scelte.push({tipo:'apertura', codice:CFG.apertura});
  if(CFG.ferramenta) scelte.push({tipo:'ferramenta', codice:CFG.ferramenta});
  if(CFG.colore_alu) scelte.push({tipo:'inserto_alu', codice:CFG.colore_alu});
  if(CFG.colore_pietra) scelte.push({tipo:'inserto_pietra', codice:CFG.colore_pietra});
  if(CFG.tipo_vetro) scelte.push({tipo:'vetro', codice:CFG.tipo_vetro});
  if(scelte.length===0) return new Set();

  // Query: trova tutte le regole dove entita_a è una delle scelte correnti
  const {data:regole} = await sb.from('regole_compatibilita')
    .select('entita_b_tipo,entita_b_codice')
    .in('entita_a_tipo', scelte.map(s=>s.tipo))
    .filter('entita_a_codice','in',\`(\${scelte.map(s=>"'"+s.codice.replace(/'/g,"''")+"'").join(',')})\`);

  // Filtra solo le regole dove entita_a_codice corrisponde alle scelte effettive
  const scelteMap = {};
  scelte.forEach(s=>{ if(!scelteMap[s.tipo]) scelteMap[s.tipo]=new Set(); scelteMap[s.tipo].add(s.codice); });
  
  // Costruisce set di esclusi: "tipo:codice"
  const esclusi = new Set();
  (regole||[]).forEach(r=>{
    esclusi.add(r.entita_b_tipo+':'+r.entita_b_codice);
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
  CFG.p_finitura = sovrTipo==='pct' ? 0 : (sovrVal||0); // pct calcolata in cfgUpdatePrice
  CFG.finitura=cod; CFG.nome_finitura=nome;
  CFG._consenteBugna=consenteBugna;
  CFG.colore_speciale=null;
  cfgUpdatePrice();
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

  // Group aperture by famiglia from sensi_apertura (more accurate than tipologie_apertura.famiglia)
  const gruppi = {};
  (ap||[]).forEach(a=>{
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
    .gt('larghezza_cm',0).gt('altezza_cm',0)
    .order('larghezza_cm').order('altezza_cm');

  const larghezze = [...new Set((misure||[]).map(m=>m.larghezza_cm))].sort((a,b)=>a-b);
  const altezze = [...new Set((misure||[]).map(m=>m.altezza_cm))].sort((a,b)=>a-b);

  let html=\`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
    <div style="font-size:13px;font-weight:500">Misure porta <span style="color:var(--mid);font-weight:400">— \${CFG.nome_apertura}</span></div>
    <button class="btn btn-sm" onclick="renderCfgStep('apertura')">← Indietro</button>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
    <div>
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Larghezza (cm)</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        \${larghezze.map(l=>\`<div onclick="selLarghezza(\${l})" style="padding:6px 12px;border-radius:var(--radius);border:\${CFG.larghezza===l?'2px solid var(--red)':'0.5px solid var(--border)'};cursor:pointer;font-size:13px;font-weight:500;background:\${CFG.larghezza===l?'var(--red-bg)':'var(--white)'};">\${l}</div>\`).join('')}
      </div>
    </div>
    <div>
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Altezza (cm)</div>
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
      <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Larghezza custom (cm)</div>
      <input type="number" id="cfg-larg-custom" placeholder="es. 87" min="30" max="300" style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="selLarghezzaCustom(this.value)">
    </div>
    <div>
      <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Altezza custom (cm)</div>
      <input type="number" id="cfg-alt-custom" placeholder="es. 215" min="100" max="400" style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="selAltezzaCustom(this.value)">
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

function selLarghezza(v){ CFG.larghezza=v; CFG.misura_custom=false; cfgMisure(); }
function selAltezza(v){ CFG.altezza=v; CFG.misura_custom=false; cfgMisure(); }
function selLarghezzaCustom(v){ if(v){ CFG.larghezza=parseFloat(v); CFG.misura_custom=true; } }
function selAltezzaCustom(v){ if(v){ CFG.altezza=parseFloat(v); CFG.misura_custom=true; } }
async function avanzaASpessore(){
  if(!CFG.larghezza||!CFG.altezza){ toast('Seleziona larghezza e altezza','err'); return; }

  // Calcola supplemento COM/FM ora che abbiamo finitura+serie
  await calcolaSupplementoComFm();

  // Determina misure standard dalla famiglia già calcolata in cfgMisure
  const famMisure = CFG._famMisure || 'BAT';
  const {data:misure}=await sb.from('misure_standard').select('*')
    .eq('famiglia_apertura',famMisure).gt('larghezza_cm',0).gt('altezza_cm',0);
  const larghezzeStd=new Set((misure||[]).map(m=>m.larghezza_cm));
  const altezzeStd=new Set((misure||[]).map(m=>m.altezza_cm));

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
    <div style="font-size:13px;font-weight:500">Spessore muro e telaio <span style="color:var(--mid);font-weight:400">— \${CFG.larghezza}×\${CFG.altezza} cm \${CFG.senso}</span></div>
    <button class="btn btn-sm" onclick="renderCfgStep('misure')">← Indietro</button>
  </div>
  <div style="margin-bottom:14px">
    <div style="font-size:12px;font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.4px;color:var(--mid)">Spessore muro (cm)</div>
    <div style="display:flex;align-items:center;gap:10px">
      <input type="number" id="cfg-spessore" value="\${CFG.spessore||''}" placeholder="es. 12.5" step="0.5" min="5" max="60"
        style="width:120px;padding:8px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:inherit"
        oninput="calcolaTelaio(this.value,'\${fam}')">
      <span style="font-size:13px;color:var(--mid)">cm</span>
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
    .select('*').eq('codice',regola.codice_spalla).eq('famiglia_apertura',fam).single();
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
      Accessorio necessario: <strong>\${regola.tipo_accessorio}</strong> \${regola.cm_accessorio?regola.cm_accessorio+' cm':''} 
      — \${prezzoAcc?'€ '+prezzoAcc:'prezzo da definire'}
      \${regola.note?'<br><span style="font-size:11px">'+regola.note+'</span>':''}
    </div>\`;
  }

  document.getElementById('cfg-telaio-result').innerHTML=\`
    <div style="background:var(--beige);border-radius:var(--radius);padding:12px 14px;border:0.5px solid var(--border)">
      <div style="font-size:12px;font-weight:500;margin-bottom:6px;color:var(--mid);text-transform:uppercase;letter-spacing:0.4px">Telaio abbinato automaticamente</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:14px;font-weight:500">Spalla \${regola.codice_spalla} — \${spalla?.spalla_cm||'?'} cm</div>
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
  const isScorrevole = fam==='SI'||fam==='SE'||fam.startsWith('SI')||fam.startsWith('SE')||fam.startsWith('S/');
  const isBattente = !isScorrevole;
  const serrature = (tutte||[]).filter(s=>{
    if(!s.famiglie_apertura) return true;
    const fams=s.famiglie_apertura.split(',').map(x=>x.trim().toUpperCase());
    if(fams.includes(fam.toUpperCase())) return true;
    const famBase=fam.replace(/[0-9]/g,'').replace(/[QAS]$/,'').trim().toUpperCase();
    if(fams.includes(famBase)) return true;
    if(isScorrevole&&(fams.includes('SI')||fams.includes('SE'))) return true;
    if(isBattente&&fams.some(f=>['BAT','CS','COM','FM','ROTO','LIBRO','SPECIALI'].includes(f))) return true;
    return false;
  });
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
  const manAll=await filtraPerCompatibilita(tutteMan||[],'maniglia','codice');

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

async function cfgRiepilogo(){
  const tot = cfgTotale();
  const desc = [
    CFG.nome_serie, CFG.nome_modello, CFG.nome_finitura,
    CFG.pannello_bugna?CFG.pannello_bugna:'',
    CFG.nome_colore_alu||'', CFG.nome_colore_pietra||'',
    CFG.nome_tipo_vetro||'',
    CFG.nome_apertura, CFG.senso,
    CFG.larghezza+'×'+CFG.altezza+' cm',
    'sp.'+CFG.spessore+' cm',
    CFG.nome_ferramenta||'',
    CFG.nome_maniglia||''
  ].filter(Boolean).join(' | ');

  // Calcola valori effettivi per riepilogo
  const p_fin_eff = (CFG._finitura_pct||0)>0 ? Math.round((CFG.p_base||0)*CFG._finitura_pct/100*100)/100 : (CFG.p_finitura||0);
  const sub_eff = (CFG.p_base||0)+p_fin_eff+(CFG.p_apertura||0)+(CFG.p_telaio||0);
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
    CFG.p_telaio>0&&{label:'Telaio / Spalla ('+CFG.spalla+')',val:CFG.p_telaio},
    CFG.p_acc_telaio>0&&{label:'Accessorio telaio ('+CFG.accessorio_telaio+')',val:CFG.p_acc_telaio},
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
      <button class="btn btn-sm" onclick="renderCfgStep('ferramenta')">← Modifica</button>
    </div>
    \${CFG.misura_custom?\`<div style="background:var(--red-bg);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--red-tx);margin-bottom:10px">⚠ Misura custom — questo ordine richiederà approvazione del responsabile tecnico</div>\`:''}
    <div style="background:var(--beige);border-radius:var(--radius);padding:12px;margin-bottom:12px;font-size:12px;color:var(--mid);line-height:1.6">\${desc}</div>
    <table style="width:100%;font-size:13px;margin-bottom:12px">
      \${righe_prezzo.map(r=>\`<tr><td style="padding:3px 0;color:var(--mid)">\${r.label}</td><td style="text-align:right;font-weight:500">€ \${(r.val||0).toLocaleString('it-IT',{minimumFractionDigits:2})}</td></tr>\`).join('')}
      <tr style="border-top:0.5px solid var(--border)"><td style="padding:8px 0;font-weight:500">Totale unitario</td><td style="text-align:right;font-size:16px;font-weight:500;color:var(--red)">€ \${tot.toLocaleString('it-IT',{minimumFractionDigits:2})}</td></tr>
    </table>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div>
        <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Quantità</div>
        <input type="number" id="cfg-qty" value="\${CFG.quantita||1}" min="1" style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="CFG.quantita=parseInt(this.value)||1;cfgUpdatePrice()">
      </div>
      <div>
        <div style="font-size:11px;color:var(--mid);margin-bottom:4px">Note riga</div>
        <input type="text" id="cfg-note-riga" value="\${CFG.note_riga||''}" placeholder="Note specifiche su questa porta..." style="width:100%;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit" oninput="CFG.note_riga=this.value">
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-size:11px;color:var(--mid)">Totale riga</div>
        <div id="cfg-prezzo-totale" style="font-size:20px;font-weight:500;color:var(--red)">€ \${(tot*(CFG.quantita||1)).toLocaleString('it-IT',{minimumFractionDigits:2})}</div>
      </div>
      <button class="btn btn-red" onclick="aggiungiRigaAlDocumento()">+ Aggiungi al documento</button>
    </div>\`;
  cfgUpdatePrice();
}

async function aggiungiRigaAlDocumento(){
  CFG.quantita = parseInt(document.getElementById('cfg-qty')?.value||1)||1;
  CFG.note_riga = document.getElementById('cfg-note-riga')?.value||'';
  const tot = cfgTotale();
  const riga = {
    codice_serie:CFG.serie, codice_modello:CFG.modello, nome_modello:CFG.nome_modello,
    nome_serie:CFG.nome_serie,
    codice_finitura:CFG.finitura, nome_finitura:CFG.nome_finitura,
    pannello_bugna:CFG.pannello_bugna,
    codice_colore_alu:CFG.colore_alu, nome_colore_alu:CFG.nome_colore_alu,
    codice_colore_pietra:CFG.colore_pietra, nome_colore_pietra:CFG.nome_colore_pietra,
    codice_tipo_vetro:CFG.tipo_vetro, nome_tipo_vetro:CFG.nome_tipo_vetro,
    codice_apertura:CFG.apertura, nome_apertura:CFG.nome_apertura,
    senso_apertura:CFG.senso,
    larghezza_cm:CFG.larghezza, altezza_cm:CFG.altezza,
    misura_custom:CFG.misura_custom, spessore_muro_cm:CFG.spessore,
    codice_spalla:CFG.spalla, tipo_accessorio_telaio:CFG.accessorio_telaio,
    codice_ferramenta:CFG.ferramenta, nome_ferramenta:CFG.nome_ferramenta,
    codice_maniglia:CFG.maniglia, nome_maniglia:CFG.nome_maniglia,
    prezzo_base:CFG.p_base, prezzo_vetro:CFG.p_vetro,
    prezzo_finitura:CFG.p_finitura, prezzo_bugna:CFG.p_bugna,
    prezzo_inserto:CFG.p_inserto, prezzo_apertura:CFG.p_apertura,
    prezzo_telaio:CFG.p_telaio, prezzo_accessorio_telaio:CFG.p_acc_telaio,
    prezzo_ferramenta:CFG.p_ferramenta, prezzo_maniglia:CFG.p_maniglia,
    prezzo_extra_incisioni:CFG.p_extra_incisioni,
    prezzo_unitario:tot, quantita:CFG.quantita,
    prezzo_totale_riga:tot*CFG.quantita,
    note_riga:CFG.note_riga
  };

  if(CFG_TARGET_ID){
    // Salvataggio diretto su documento esistente
    const tabella = CFG_MODE==='preventivo'?'righe_preventivo':'righe_ordine';
    const fk = CFG_MODE==='preventivo'?'preventivo_id':'ordine_id';
    const {data:esistenti} = await sb.from(tabella).select('riga_numero').eq(fk,CFG_TARGET_ID).order('riga_numero',{ascending:false}).limit(1);
    const nextNum = (esistenti?.[0]?.riga_numero||0)+1;
    await sb.from(tabella).insert([{...riga,[fk]:CFG_TARGET_ID,riga_numero:nextNum}]);
    // Aggiorna totale documento
    await ricalcolaTotale(CFG_TARGET_ID, CFG_MODE);
    toast('Porta aggiunta','ok');
    closeCfg();
    if(CFG_MODE==='preventivo') renderPreventivoDetail(CFG_TARGET_ID);
    else renderOrdineDetail(CFG_TARGET_ID);
  } else {
    // Accumulo locale (documento non ancora salvato)
    CFG_RIGHE.push(riga);
    toast('Porta aggiunta — salva il documento per confermare','ok');
    closeCfg();
    renderNuovoDocBozza();
  }
  resetCFG();
}

async function ricalcolaTotale(docId, mode){
  const tabRighe = mode==='preventivo'?'righe_preventivo':'righe_ordine';
  const fk = mode==='preventivo'?'preventivo_id':'ordine_id';
  const tabDoc = mode==='preventivo'?'preventivi':'ordini_vendita';
  const {data:righe} = await sb.from(tabRighe).select('prezzo_totale_riga').eq(fk,docId);
  const totImponibile = (righe||[]).reduce((s,r)=>s+(r.prezzo_totale_riga||0),0);
  await sb.from(tabDoc).update({totale_imponibile:totImponibile}).eq('id',docId);
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

  const stats={bozza:0,inviato:0,firmato:0,rifiutato:0};
  (data||[]).forEach(p=>{ if(stats[p.stato]!==undefined) stats[p.stato]++; });

  const rows=(data||[]).map(p=>\`<tr class="data-row" onclick="renderPreventivoDetail('\${p.id}')">
    <td><strong>\${p.numero}</strong></td>
    <td>\${p.anagrafiche?.ragione_sociale||'—'}</td>
    <td>\${p.agenti?p.agenti.nome+' '+p.agenti.cognome:'—'}</td>
    <td>\${fmtData(p.data_creazione)}</td>
    <td>\${fmtData(p.data_scadenza)}</td>
    <td><span class="tag">\${p.listino}</span></td>
    <td>\${fmtEuro(p.totale_netto||p.totale_imponibile)}</td>
    <td>\${badgeStato(p.stato)}</td>
  </tr>\`).join('');

  document.getElementById('main-content').innerHTML=\`
  <div class="grid-4" style="margin-bottom:16px">
    <div class="metric"><div class="metric-label">Bozze</div><div class="metric-value">\${stats.bozza}</div></div>
    <div class="metric"><div class="metric-label">Inviati</div><div class="metric-value">\${stats.inviato}</div></div>
    <div class="metric"><div class="metric-label">Firmati</div><div class="metric-value" style="color:var(--green-tx)">\${stats.firmato}</div></div>
    <div class="metric"><div class="metric-label">Rifiutati</div><div class="metric-value" style="color:var(--red)">\${stats.rifiutato}</div></div>
  </div>
  <div class="card">
    <div class="card-header">
      <span class="card-title">Preventivi</span>
      <button class="btn btn-red btn-sm" onclick="nuovoPreventivo()">+ Nuovo preventivo</button>
    </div>
    <table>
      <thead><tr><th>N°</th><th>Cliente</th><th>Agente</th><th>Data</th><th>Scadenza</th><th>Listino</th><th>Totale netto</th><th>Stato</th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--mid);font-style:italic">Nessun preventivo ancora — clicca "+ Nuovo preventivo"</td></tr>'}</tbody>
    </table>
  </div>\`;
  } catch(e) {
    console.error('renderPreventivi error:',e);
    document.getElementById('main-content').innerHTML=\`<div class="card">
      <div style="padding:20px">
        <p style="color:var(--red);margin-bottom:12px">Errore caricamento preventivi: \${e.message}</p>
        <button class="btn btn-red btn-sm" onclick="nuovoPreventivo()">+ Nuovo preventivo</button>
      </div>
    </div>\`;
  }
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
  document.getElementById('ndoc-prv').value = cliente.provincia||'';

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
        <div style="font-size:11px;color:var(--mid)">\${[r.nome_apertura,r.senso_apertura,r.larghezza_cm&&r.larghezza_cm+'×'+r.altezza_cm+' cm','sp.'+(r.spessore_muro_cm||'?')+' cm'].filter(Boolean).join(' | ')}</div>
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

    // Numerazione semplice: anno + timestamp ultimi 5 cifre
    const anno = new Date().getFullYear();
    const seq = String(Date.now()).slice(-5);
    const prefisso = mode==='preventivo'?'PRV':'ORD';
    const numero = \`\${prefisso}-\${anno}-\${seq}\`;

    const tabDoc = mode==='preventivo'?'preventivi':'ordini_vendita';
    const docData = {
      numero, anagrafica_id:clienteId, agente_id:agenteId||null,
      listino, sconto1:sc1, sconto2:sc2,
      indirizzo_destinazione:ind, cap_destinazione:cap,
      citta_destinazione:cit, provincia_destinazione:prv,
      trasporto, note,
      totale_imponibile:imponibile, totale_netto:netto,
      provvigione_pct:provvPct, provvigione_euro:provvEuro,
      creato_da:currentUser?.id,
      nome_compilatore:currentNomeUtente||currentUser?.email||'—',
      ...(mode==='ordine'?{richiede_approvazione_tecnica:haCustom}:{})
    };

    const {data:doc,error} = await sb.from(tabDoc).insert([docData]).select().single();
    if(error){ toast('Errore salvataggio: '+error.message,'err'); return; }

    // Salva righe
    const tabRighe = mode==='preventivo'?'righe_preventivo':'righe_ordine';
    const fk = mode==='preventivo'?'preventivo_id':'ordine_id';
    const righe = CFG_RIGHE.map((r,i)=>({...r,[fk]:doc.id,riga_numero:i+1}));
    const {error:errRighe} = await sb.from(tabRighe).insert(righe);
    if(errRighe){ toast('Errore salvataggio righe: '+errRighe.message,'err'); return; }

    toast(numero+' salvato con successo','ok');
    document.getElementById('modal-nuovo-doc').classList.remove('open');
    CFG_RIGHE=[];
    if(mode==='preventivo') renderPreventivi();
    else renderOrdiniDiretti();

  } catch(e) {
    console.error('salvaNuovoDoc error:', e);
    toast('Errore imprevisto: '+e.message,'err');
  }
}

async function renderPreventivoDetail(id){
  const [{data:prev},{data:righe}] = await Promise.all([
    sb.from('preventivi').select('*,anagrafiche(ragione_sociale,partita_iva),agenti(nome,cognome)').eq('id',id).single(),
    sb.from('righe_preventivo').select('*').eq('preventivo_id',id).order('riga_numero'),
  ]);
  if(!prev) return;
  CFG_TARGET_ID=id; CFG_MODE='preventivo';
  window._prevListino=prev.listino;

  const sc1=prev.sconto1||0; const sc2=prev.sconto2||0;
  const netto=prev.totale_imponibile*(1-sc1/100)*(1-sc2/100);

  const rowsRighe=(righe||[]).map(r=>\`
    <tr>
      <td style="font-size:12px;font-weight:500">\${r.riga_numero}</td>
      <td>
        <div style="font-size:13px;font-weight:500">\${r.nome_modello||''}</div>
        <div style="font-size:11px;color:var(--mid)">\${[r.nome_finitura,r.pannello_bugna,r.nome_apertura,r.senso_apertura,r.larghezza_cm&&r.larghezza_cm+'×'+r.altezza_cm+' cm','sp.'+(r.spessore_muro_cm||'?')+' cm',r.nome_ferramenta,r.nome_maniglia].filter(Boolean).join(' | ')}</div>
        \${r.misura_custom?'<span style="font-size:10px;background:var(--red-bg);color:var(--red-tx);padding:1px 5px;border-radius:3px">Custom</span>':''}
      </td>
      <td style="text-align:center">\${r.quantita}</td>
      <td style="text-align:right">\${fmtEuro(r.prezzo_unitario)}</td>
      <td style="text-align:right;font-weight:500">\${fmtEuro(r.prezzo_totale_riga)}</td>
      <td><button class="btn btn-sm" style="color:var(--red)" onclick="eliminaRiga('righe_preventivo','\${r.id}','\${id}','preventivo')">×</button></td>
    </tr>\`).join('');

  document.getElementById('main-content').innerHTML=\`
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <div>
      <button class="btn btn-sm" onclick="renderPreventivi()">← Tutti i preventivi</button>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-sm" onclick="openConfiguratore('preventivo','\${id}','\${prev.listino}')">+ Aggiungi porta</button>
      \${prev.stato==='bozza'?\`<button class="btn btn-sm" onclick="cambiaStato('preventivi','\${id}','inviato','renderPreventivoDetail')">Invia al cliente</button>\`:''}
      \${prev.stato==='inviato'?\`<button class="btn btn-red btn-sm" onclick="firmaPreventivo('\${id}')">Firma e converti in ordine</button>\`:''}
    </div>
  </div>
  <div class="grid-2" style="margin-bottom:14px">
    <div class="card">
      <div class="card-title">Intestazione preventivo</div>
      <table style="font-size:13px">
        <tr><td style="color:var(--mid);padding:3px 0;width:130px">N° Preventivo</td><td><strong>\${prev.numero}</strong></td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Cliente</td><td>\${prev.anagrafiche?.ragione_sociale||'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Agente</td><td>\${prev.agenti?prev.agenti.nome+' '+prev.agenti.cognome:'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Data</td><td>\${fmtData(prev.data_creazione)}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Listino</td><td><span class="tag">\${prev.listino}</span></td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Trasporto</td><td>\${prev.trasporto||'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0;width:130px">Stato</td><td>\${badgeStato(prev.stato)}</td></tr>
        \${prev.nome_compilatore?\`<tr><td style="color:var(--mid);padding:3px 0">Compilato da</td><td style="font-size:12px">\${prev.nome_compilatore}</td></tr>\`:''}
      </table>
    </div>
    <div class="card">
      <div class="card-title">Riepilogo economico</div>
      <table style="font-size:13px">
        <tr><td style="color:var(--mid);padding:3px 0;width:130px">Imponibile</td><td style="text-align:right">\${fmtEuro(prev.totale_imponibile)}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Sconto 1</td><td style="text-align:right">\${sc1}%</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Sconto 2</td><td style="text-align:right">\${sc2||0}%</td></tr>
        <tr style="border-top:0.5px solid var(--border)"><td style="padding:6px 0;font-weight:500">Totale netto</td><td style="text-align:right;font-size:18px;font-weight:500;color:var(--red)">\${fmtEuro(netto)}</td></tr>
      </table>
      \${prev.note?\`<div style="margin-top:10px;font-size:12px;color:var(--mid)">\${prev.note}</div>\`:''}
    </div>
  </div>
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
    totale_imponibile:prev.totale_imponibile,
    totale_netto:prev.totale_netto||prev.totale_imponibile,
    richiede_approvazione_tecnica:haCustom,
    stato:'in_attesa', creato_da:currentUser?.id, nome_compilatore:currentNomeUtente||currentUser?.email||'—'
  }]).select().single();

  if(ord?.data||ord){
    const ordId = ord.data?.id||ord.id;
    const righeOrd=(righe||[]).map(r=>({
      ...r, id:undefined, ordine_id:ordId,
      riga_preventivo_id:r.id, preventivo_id:undefined
    }));
    await sb.from('righe_ordine').insert(righeOrd);
    await sb.from('preventivi').update({stato:'firmato'}).eq('id',prevId);
    toast(numero+' creato — in attesa di approvazione','ok');
    renderPreventivi();
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

  const rows=(data||[]).map(o=>\`<tr class="data-row" onclick="renderOrdineDetail('\${o.id}')">
    <td><strong>\${o.numero}</strong></td>
    <td>\${o.anagrafiche?.ragione_sociale||'—'}</td>
    <td>\${o.agenti?o.agenti.nome+' '+o.agenti.cognome:'—'}</td>
    <td>\${o.preventivo_id?'<span class="badge bb">Da prev.</span>':'<span class="badge bgr">Diretto</span>'}</td>
    <td>\${fmtData(o.data_ordine)}</td>
    <td>\${fmtEuro(o.totale_netto||o.totale_imponibile)}</td>
    <td>\${badgeStato(o.stato)}</td>
    <td>\${o.richiede_approvazione_tecnica?'<span class="badge br">Tecnica</span>':'<span class="badge bg">Standard</span>'}</td>
  </tr>\`).join('');

  document.getElementById('main-content').innerHTML=\`
  <div class="card">
    <div class="card-header">
      <span class="card-title">Ordini</span>
      <button class="btn btn-red btn-sm" onclick="nuovoOrdineDiretto()">+ Nuova conferma d'ordine</button>
    </div>
    <table>
      <thead><tr><th>N°</th><th>Cliente</th><th>Agente</th><th>Origine</th><th>Data</th><th>Totale netto</th><th>Stato</th><th>Approvazione</th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--mid);font-style:italic">Nessun ordine ancora</td></tr>'}</tbody>
    </table>
  </div>\`;
  } catch(e) {
    console.error('renderOrdiniDiretti error:',e);
    document.getElementById('main-content').innerHTML=\`<div class="card">
      <div style="padding:20px">
        <p style="color:var(--red);margin-bottom:12px">Errore caricamento ordini: \${e.message}</p>
        <button class="btn btn-red btn-sm" onclick="nuovoOrdineDiretto()">+ Nuova conferma d'ordine</button>
      </div>
    </div>\`;
  }
}

async function nuovoOrdineDiretto(){
  try {
    const [{data:clienti},{data:agenti}] = await Promise.all([
      sb.from('anagrafiche').select('*').order('ragione_sociale'),
      sb.from('agenti').select('*').eq('attivo',true).order('cognome'),
    ]);
    CFG_RIGHE=[];
    const modal=ensureModalInBody('modal-nuovo-doc');
    if(!modal){ toast('Errore: modal non trovato','err'); return; }
    modal.dataset.mode='ordine';
    document.getElementById('ndoc-title').textContent="Nuova conferma d'ordine";
    document.getElementById('ndoc-clienti').innerHTML='<option value="">Seleziona cliente...</option>'+(clienti||[]).map(c=>\`<option value="\${c.id}" data-listino="\${c.listino||'A'}" data-sa="\${c.sconto_dedicato_A||0}" data-sp="\${c.sconto_dedicato_P||0}" data-ind="\${c.indirizzo||''}" data-cap="\${c.cap||''}" data-cit="\${c.citta||''}" data-prv="\${c.provincia||''}">\${c.ragione_sociale}</option>\`).join('');
    document.getElementById('ndoc-agenti').innerHTML='<option value="">Nessun agente</option>'+(agenti||[]).map(a=>\`<option value="\${a.id}">\${a.cognome} \${a.nome}</option>\`).join('');
    document.getElementById('ndoc-righe-list').innerHTML='<div style="text-align:center;padding:20px;color:var(--mid);font-size:13px;font-style:italic">Nessuna porta ancora</div>';
    document.getElementById('ndoc-totale').textContent='€ 0,00';
    modal.classList.add('open');
  } catch(e) {
    console.error('nuovoOrdineDiretto error:', e);
    toast('Errore apertura ordine: '+e.message,'err');
  }
}

async function renderOrdineDetail(id){
  const [{data:ord},{data:righe}] = await Promise.all([
    sb.from('ordini_vendita').select('*,anagrafiche(ragione_sociale),agenti(nome,cognome)').eq('id',id).single(),
    sb.from('righe_ordine').select('*').eq('ordine_id',id).order('riga_numero'),
  ]);
  if(!ord) return;
  CFG_TARGET_ID=id; CFG_MODE='ordine';
  window._prevListino=ord.listino;

  const possoApprovareComm = isRespComm();
  const possoApprovaTec = isRespTec();

  const rowsRighe=(righe||[]).map(r=>\`
    <tr>
      <td style="font-size:12px;font-weight:500">\${r.riga_numero}</td>
      <td>
        <div style="font-size:13px;font-weight:500">\${r.nome_modello||''}</div>
        <div style="font-size:11px;color:var(--mid)">\${[r.nome_finitura,r.pannello_bugna,r.nome_apertura,r.senso_apertura,r.larghezza_cm&&r.larghezza_cm+'×'+r.altezza_cm+' cm','sp.'+(r.spessore_muro_cm||'?')+' cm',r.nome_ferramenta,r.nome_maniglia].filter(Boolean).join(' | ')}</div>
        \${r.misura_custom?'<span style="font-size:10px;background:var(--red-bg);color:var(--red-tx);padding:1px 5px;border-radius:3px">Custom</span>':''}
      </td>
      <td style="text-align:center">\${r.quantita}</td>
      <td style="text-align:right">\${fmtEuro(r.prezzo_unitario)}</td>
      <td style="text-align:right;font-weight:500">\${fmtEuro(r.prezzo_totale_riga)}</td>
    </tr>\`).join('');

  let bottoniApprovazione='';
  if(ord.stato==='in_attesa'&&possoApprovareComm){
    bottoniApprovazione=\`<button class="btn btn-red btn-sm" onclick="approvaOrdine('\${id}','comm')">Approva (commerciale)</button>
    <button class="btn btn-sm" onclick="cambiaStato('ordini_vendita','\${id}','bloccato','renderOrdineDetail')">Blocca</button>\`;
  }
  if(ord.stato==='approvato_comm'&&ord.richiede_approvazione_tecnica&&possoApprovaTec){
    bottoniApprovazione+=\`<button class="btn btn-red btn-sm" onclick="approvaOrdine('\${id}','tec')">Approva (tecnico)</button>\`;
  }
  if((ord.stato==='approvato_comm'&&!ord.richiede_approvazione_tecnica)||(ord.stato==='approvato_tec')){
    bottoniApprovazione+=\`<button class="btn btn-red btn-sm" onclick="cambiaStato('ordini_vendita','\${id}','in_produzione','renderOrdineDetail')">Lancia in produzione</button>\`;
  }

  document.getElementById('main-content').innerHTML=\`
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <button class="btn btn-sm" onclick="renderOrdiniDiretti()">← Tutti gli ordini</button>
    <div style="display:flex;gap:8px">
      \${ord.stato==='in_attesa'?\`<button class="btn btn-sm" onclick="openConfiguratore('ordine','\${id}','\${ord.listino}')">+ Aggiungi porta</button>\`:''}
      \${bottoniApprovazione}
    </div>
  </div>
  <div class="grid-2" style="margin-bottom:14px">
    <div class="card">
      <div class="card-title">Intestazione ordine</div>
      <table style="font-size:13px">
        <tr><td style="color:var(--mid);padding:3px 0;width:140px">N° Ordine</td><td><strong>\${ord.numero}</strong></td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Cliente</td><td>\${ord.anagrafiche?.ragione_sociale||'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Agente</td><td>\${ord.agenti?ord.agenti.nome+' '+ord.agenti.cognome:'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Listino</td><td><span class="tag">\${ord.listino}</span></td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Trasporto</td><td>\${ord.trasporto||'—'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Approvazione</td><td>\${ord.richiede_approvazione_tecnica?'<span class="badge br">Tecnica richiesta</span>':'<span class="badge bg">Solo commerciale</span>'}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Stato</td><td>\${badgeStato(ord.stato)}</td></tr>
        \${ord.nome_compilatore?\`<tr><td style="color:var(--mid);padding:3px 0">Compilato da</td><td style="font-size:12px">\${ord.nome_compilatore}</td></tr>\`:''}
      </table>
    </div>
    <div class="card">
      <div class="card-title">Riepilogo economico</div>
      <table style="font-size:13px">
        <tr><td style="color:var(--mid);padding:3px 0;width:140px">Imponibile</td><td style="text-align:right">\${fmtEuro(ord.totale_imponibile)}</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Sconto 1</td><td style="text-align:right">\${ord.sconto1||0}%</td></tr>
        <tr><td style="color:var(--mid);padding:3px 0">Sconto 2</td><td style="text-align:right">\${ord.sconto2||0}%</td></tr>
        <tr style="border-top:0.5px solid var(--border)"><td style="padding:6px 0;font-weight:500">Totale netto</td><td style="text-align:right;font-size:18px;font-weight:500;color:var(--red)">\${fmtEuro(ord.totale_netto||ord.totale_imponibile)}</td></tr>
      </table>
    </div>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Righe ordine (\${righe?.length||0} porte)</span></div>
    <table>
      <thead><tr><th>#</th><th>Descrizione porta</th><th style="text-align:center">Q.tà</th><th style="text-align:right">Unitario</th><th style="text-align:right">Totale riga</th></tr></thead>
      <tbody>\${rowsRighe||'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--mid)">Nessuna porta</td></tr>'}</tbody>
    </table>
  </div>\`;
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
  {id:'agenti',      label:'Agenti',            icon:'M8 5a3 3 0 100 6 3 3 0 000-6zM2 14c0-3 2-5 6-5s6 2 6 5'},
  {id:'impostazioni',label:'Impostazioni',      icon:'M8 5a3 3 0 100 6M8 1v2M8 13v2M1 8h2M13 8h2'},
];

const ADMIN_SUB = {
  catalogo:   ['serie','modelli','finiture','aperture','ferramenta','maniglie'],
  prezzi:     ['listini','sovrapprezzi','scontistiche'],
  telaio:     ['spalle','regole','scorrevoli_int','scorrevoli_ext','colori'],
  distinte:   ['db_modelli'],
  agenti:     ['agenti_lista'],
  impostazioni:['generale','utenti'],
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
  else if(adminSection==='distinte') adminDistinte();
  else if(adminSection==='compatibilita') adminCompatibilita();
  else if(adminSection==='agenti') adminAgenti();
  else if(adminSection==='impostazioni') adminImpostazioni();
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
  const rows=(data||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.codice,\`adminSalva('serie','\${s.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(s.nome,\`adminSalva('serie','\${s.id}','nome',this.value)\`,'140px','text')}</td>
    <td>\${inlineInput(s.descrizione||'',\`adminSalva('serie','\${s.id}','descrizione',this.value)\`,'220px','text','Descrizione')}</td>
    <td>
      \${s.immagine_url?\`<img src="\${s.immagine_url}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;margin-right:6px">\`:'<span style="font-size:11px;color:var(--mid)">Nessuna</span>'}
      <label style="cursor:pointer"><input type="file" accept="image/*" style="display:none" onchange="uploadImmagine('serie','\${s.id}',this)"><span class="btn btn-sm" style="font-size:11px">📷 Carica</span></label>
    </td>
    <td>\${adminToggle(s.attiva,\`toggleCampo('serie','\${s.id}','attiva',\${s.attiva})\`)}</td>
    <td><button onclick="eliminaRigaAdmin('serie','\${s.id}','adminSerie')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px" title="Elimina">×</button></td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Serie',\`
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Descrizione</th><th>Immagine</th><th>Stato</th><th></th></tr></thead>
    <tbody>\${rows}</tbody></table>\`,
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
      <thead><tr><th>Codice</th><th>Nome</th><th>Serie</th><th>Variante</th><th>Flag</th><th>Prezzo A</th><th>Prezzo P</th><th>Vetro A</th><th>Extra incis.</th><th>Staffe A</th><th>Staffe P</th><th>Img</th><th>Stato</th><th></th></tr></thead>
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
  const {data:serie} = await sb.from('serie').select('codice').order('codice');
  const serieFilter = window._adminFinSerie || document.getElementById('admin-serie-filter')?.value || 'TAM';
  window._adminFinSerie = serieFilter;

  const {data} = await sb.from('finiture').select('*').eq('codice_serie',serieFilter).order('fascia').order('nome_finitura');
  const serieOpts=(serie||[]).map(s=>\`<option value="\${s.codice}" \${s.codice===serieFilter?'selected':''}>\${s.codice}</option>\`).join('');

  // Serie laccate che usano fascia e pct
  const isLaccata = ['LAC','GEO','GL','JAD','ACC','PAN-BL'].includes(serieFilter);

  const rows=(data||[]).map(f=>\`<tr>
    <td>\${inlineInput(f.codice_finitura,\`adminSalva('finiture','\${f.id}','codice_finitura',this.value)\`,'60px','text')}</td>
    <td>\${inlineInput(f.nome_finitura,\`adminSalva('finiture','\${f.id}','nome_finitura',this.value)\`,'150px','text')}</td>
    <td>\${inlineInput(f.codice_modello||'',\`adminSalva('finiture','\${f.id}','codice_modello',this.value)\`,'70px','text','Tutti')}</td>
    \${isLaccata?\`<td>
      <select onchange="adminSalva('finiture','\${f.id}','fascia',this.value);window._adminFinSerie='\${serieFilter}';adminFiniture();"
        style="padding:3px 6px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:11px;font-family:inherit">
        <option value="" \${!f.fascia?'selected':''}>— nessuna —</option>
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
    <thead><tr><th>Codice</th><th>Nome</th><th>Modello</th>\${theadLaccata}<th>Bugna</th><th>Bugna A</th><th>Bugna P</th><th>Stato</th><th></th></tr></thead>
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
async function adminMisure(){
  const {data:famiglie} = await sb.from('misure_standard').select('famiglia_apertura').order('famiglia_apertura');
  const famSet = [...new Set((famiglie||[]).map(f=>f.famiglia_apertura))];
  const famFilter = window._adminMisureFam || famSet[0] || 'BAT';
  window._adminMisureFam = famFilter;

  const {data} = await sb.from('misure_standard').select('*').eq('famiglia_apertura',famFilter).order('larghezza_cm').order('altezza_cm');

  const famOpts = famSet.map(f=>\`<option value="\${f}" \${f===famFilter?'selected':''}>\${f}</option>\`).join('');

  const rows=(data||[]).map(m=>\`<tr>
    <td>\${inlineInput(m.larghezza_cm,\`adminSalva('misure_standard','\${m.id}','larghezza_cm',this.value)\`,'70px','number')} cm</td>
    <td>\${inlineInput(m.altezza_cm,\`adminSalva('misure_standard','\${m.id}','altezza_cm',this.value)\`,'70px','number')} cm</td>
    <td style="font-size:12px;color:var(--mid)">\${m.famiglia_apertura}</td>
    <td><button onclick="eliminaRigaAdmin('misure_standard','\${m.id}','adminMisure')" style="background:none;border:none;color:var(--mid);cursor:pointer;font-size:16px">×</button></td>
  </tr>\`).join('');

  document.getElementById('admin-sub').innerHTML=\`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <label style="font-size:12px;color:var(--mid)">Famiglia:</label>
      <select onchange="window._adminMisureFam=this.value;adminMisure()" style="padding:5px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:inherit">\${famOpts}</select>
      <button class="btn btn-red btn-sm" onclick="nuovaMisura('\${famFilter}')">+ Aggiungi misura</button>
    </div>
    \${adminCard(\`Misure standard — \${famFilter}\`,\`
      <table><thead><tr><th>Larghezza</th><th>Altezza</th><th>Famiglia</th><th></th></tr></thead>
      <tbody>\${rows||'<tr><td colspan="4" style="text-align:center;color:var(--mid);padding:16px">Nessuna misura</td></tr>'}</tbody>
    </table>\`)}\`;
}

async function nuovaMisura(fam){
  const l=prompt('Larghezza (cm):'); if(!l) return;
  const a=prompt('Altezza (cm):'); if(!a) return;
  const {error}=await sb.from('misure_standard').insert([{famiglia_apertura:fam,larghezza_cm:parseFloat(l),altezza_cm:parseFloat(a)}]);
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
      <thead><tr><th>Codice</th><th>Nome</th><th>Serie compatibili</th><th>Descrizione</th><th>Prezzo A</th><th>Prezzo P</th><th>Immagine</th><th>Stato</th><th></th></tr></thead>
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
  </tr>\`).join('');
  const rowsA=(alu||[]).map(a=>\`<tr>
    <td>\${inlineInput(a.codice,\`adminSalva('colori_inserto_alluminio','\${a.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(a.nome,\`adminSalva('colori_inserto_alluminio','\${a.id}','nome',this.value)\`,'150px','text')}</td>
    <td><span class="badge \${a.incluso?'bg':'ba'}" style="cursor:pointer;font-size:10px" onclick="toggleCampo('colori_inserto_alluminio','\${a.id}','incluso',\${a.incluso})">\${a.incluso?'Incluso':'A pagamento'}</span></td>
    <td>\${inlineInput(a.sovrapprezzo_a??'',\`adminSalva('colori_inserto_alluminio','\${a.id}','sovrapprezzo_a',this.value)\`,'65px','number','0')}</td>
    <td>\${inlineInput(a.sovrapprezzo_p??'',\`adminSalva('colori_inserto_alluminio','\${a.id}','sovrapprezzo_p',this.value)\`,'65px','number','0')}</td>
  </tr>\`).join('');
  const rowsP=(pietra||[]).map(p=>\`<tr>
    <td>\${inlineInput(p.codice,\`adminSalva('colori_pietra','\${p.id}','codice',this.value)\`,'70px','text')}</td>
    <td>\${inlineInput(p.nome,\`adminSalva('colori_pietra','\${p.id}','nome',this.value)\`,'150px','text')}</td>
    <td>\${inlineInput(p.sovrapprezzo_a??0,\`adminSalva('colori_pietra','\${p.id}','sovrapprezzo_a',this.value)\`,'65px')}</td>
    <td>\${inlineInput(p.sovrapprezzo_p??0,\`adminSalva('colori_pietra','\${p.id}','sovrapprezzo_p',this.value)\`,'65px')}</td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=\`
  <div class="card" style="margin-bottom:12px">
    <div class="card-header"><span class="card-title">Tipi vetro</span><button class="btn btn-red btn-sm" onclick="nuovaRiga('tipi_vetro',{codice:'VET',nome:'Nuovo vetro',sovrapprezzo_a:0,sovrapprezzo_p:0,attivo:true},'adminColoriExtra')">+</button></div>
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Sovr.A</th><th>Sovr.P</th><th>Stato</th></tr></thead><tbody>\${rowsV||'<tr><td colspan="5" style="text-align:center;color:var(--mid);padding:12px">Nessuno</td></tr>'}</tbody></table>
  </div>
  <div class="card" style="margin-bottom:12px">
    <div class="card-header"><span class="card-title">Colori inserto alluminio</span><button class="btn btn-red btn-sm" onclick="nuovaRiga('colori_inserto_alluminio',{codice:'ALU',nome:'Nuovo colore',incluso:false},'adminColoriExtra')">+</button></div>
    <table><thead><tr><th>Codice</th><th>Nome</th><th>Incluso</th><th>Sovr.A</th><th>Sovr.P</th></tr></thead><tbody>\${rowsA||'<tr><td colspan="5" style="text-align:center;color:var(--mid);padding:12px">Nessuno</td></tr>'}</tbody></table>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Colori pietra</span><button class="btn btn-red btn-sm" onclick="nuovaRiga('colori_pietra',{codice:'PIE',nome:'Nuovo colore',sovrapprezzo_a:0,sovrapprezzo_p:0},'adminColoriExtra')">+</button></div>
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
    {id:'scorrevoli_ext',label:'Scorrevoli esterni'},{id:'scorrevoli_int',label:'Scorrevoli interni'}];
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
}

async function adminSpalle(){
  const {data} = await sb.from('telai_spalle').select('*').order('famiglia_apertura').order('spalla_cm');
  const rows=(data||[]).map(s=>\`<tr>
    <td>\${inlineInput(s.codice,\`adminSalva('telai_spalle','\${s.id}','codice',this.value)\`,'90px','text')}</td>
    <td>\${inlineInput(s.spalla_cm,\`adminSalva('telai_spalle','\${s.id}','spalla_cm',this.value)\`,'60px')} cm</td>
    <td><span class="tag" style="font-size:10px">\${s.famiglia_apertura}</span></td>
    <td style="font-size:11px;color:var(--mid);max-width:160px">\${s.descrizione||''}</td>
    <td>\${inlineInput(s.prezzo_a??'',\`adminSalva('telai_spalle','\${s.id}','prezzo_a',this.value)\`,'70px','number','€')}</td>
    <td>\${inlineInput(s.prezzo_p??'',\`adminSalva('telai_spalle','\${s.id}','prezzo_p',this.value)\`,'70px','number','€')}</td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Spalle telaio a magazzino',\`
    <table><thead><tr><th>Codice</th><th>Spalla</th><th>Famiglia</th><th>Descrizione</th><th>Prezzo A (€)</th><th>Prezzo P (€)</th></tr></thead>
    <tbody>\${rows}</tbody></table>\`);
}

async function adminRegole(){
  const {data} = await sb.from('regole_telaio').select('*').order('famiglia_apertura').order('spessore_da_cm');
  const rows=(data||[]).map(r=>\`<tr>
    <td><span class="tag" style="font-size:10px">\${r.famiglia_apertura}</span></td>
    <td style="font-size:12px">\${r.spessore_da_cm} – \${r.spessore_a_cm} cm</td>
    <td><strong style="font-size:12px">\${r.codice_spalla}</strong></td>
    <td style="font-size:12px">\${r.tipo_accessorio||'—'}</td>
    <td style="font-size:12px">\${r.cm_accessorio||'—'}</td>
    <td>\${inlineInput(r.prezzo_access_A??'',\`adminSalva('regole_telaio','\${r.id}','prezzo_access_A',this.value)\`,'70px','number','€')}</td>
    <td>\${inlineInput(r.prezzo_access_P??'',\`adminSalva('regole_telaio','\${r.id}','prezzo_access_P',this.value)\`,'70px','number','€')}</td>
    <td style="font-size:11px;color:var(--mid);max-width:160px">\${r.note||''}</td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Regole abbinamento spessore → telaio',\`
    <div style="overflow-x:auto"><table>
      <thead><tr><th>Famiglia</th><th>Spessore</th><th>Spalla</th><th>Accessorio</th><th>Cm</th><th>Costo A (€)</th><th>Costo P (€)</th><th>Note</th></tr></thead>
      <tbody>\${rows}</tbody>
    </table></div>\`);
}

async function adminScorExt(){
  const {data} = await sb.from('scorrevoli_esterni').select('*').order('codice_apertura').order('spessore_da_cm');
  const rows=(data||[]).map(s=>\`<tr>
    <td><strong style="font-size:12px">\${s.codice_apertura}</strong></td>
    <td style="font-size:12px">\${s.spessore_da_cm}–\${s.spessore_a_cm} cm</td>
    <td style="font-size:11px">\${s.tipo_accessorio||'—'} \${s.cm_accessorio?s.cm_accessorio+'cm':''}</td>
    <td>\${inlineInput(s.prezzo_a??'',\`adminSalva('scorrevoli_esterni','\${s.id}','prezzo_a',this.value)\`,'75px','number','€')}</td>
    <td>\${inlineInput(s.prezzo_p??'',\`adminSalva('scorrevoli_esterni','\${s.id}','prezzo_p',this.value)\`,'75px','number','€')}</td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Scorrevoli esterni — prezzi per fascia spessore',\`
    <table><thead><tr><th>Tipologia</th><th>Spessore muro</th><th>Accessorio</th><th>Prezzo A (€)</th><th>Prezzo P (€)</th></tr></thead>
    <tbody>\${rows}</tbody></table>\`);
}

async function adminScorInt(){
  const {data} = await sb.from('scorrevoli_interni').select('*').order('codice_apertura').order('spalla_cassone_cm');
  const rows=(data||[]).map(s=>\`<tr>
    <td><strong style="font-size:12px">\${s.codice_apertura}</strong></td>
    <td style="font-size:12px">\${s.codice_cassone}</td>
    <td style="font-size:12px">\${s.spalla_cassone_cm} cm</td>
    <td><strong style="font-size:12px">\${s.kit_telaio_codice}</strong></td>
    <td>\${inlineInput(s.prezzo_a??'',\`adminSalva('scorrevoli_interni','\${s.id}','prezzo_a',this.value)\`,'75px','number','€')}</td>
    <td>\${inlineInput(s.prezzo_p??'',\`adminSalva('scorrevoli_interni','\${s.id}','prezzo_p',this.value)\`,'75px','number','€')}</td>
  </tr>\`).join('');
  document.getElementById('admin-sub').innerHTML=adminCard('Scorrevoli interni — kit cassone',\`
    <table><thead><tr><th>Tipologia</th><th>Cassone</th><th>Spalla</th><th>Kit telaio</th><th>Prezzo A (€)</th><th>Prezzo P (€)</th></tr></thead>
    <tbody>\${rows}</tbody></table>\`);
}

// ══════════════════════════════════════════════════════
// DISTINTE BASE
// ══════════════════════════════════════════════════════
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
    sb.from('regole_compatibilita').select('*').order('entita_a_tipo').order('entita_a_codice').limit(200),
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

  // Filtra regole per A selezionato
  const regoleFiltrate = (regole||[]).filter(r=> (!aCodice || (r.entita_a_tipo===aTipo && r.entita_a_codice===aCodice)));
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
          : \`<button onclick="aggiungiRegola('\${aTipo}','\${aCodice}','\${aNome.replace(/'/g,"\\'")}','\${bTipo}','\${cod}','\${nome.replace(/'/g,"\\'")}');" style="padding:3px 12px;border-radius:4px;border:0.5px solid var(--border);font-size:11px;cursor:pointer;background:none;color:var(--mid);font-family:inherit">🚫 Escludi</button>\`
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

async function aggiungiRegola(aTipo, aCodice, aNome, bTipo, bCodice, bNome){
  const {error}=await sb.from('regole_compatibilita').insert([{
    entita_a_tipo:aTipo, entita_a_codice:aCodice, entita_a_nome:aNome,
    entita_b_tipo:bTipo, entita_b_codice:bCodice, entita_b_nome:bNome,
    creato_da:currentUser?.id,
    nome_compilatore:currentNomeUtente||currentUser?.email||'—'
  }]);
  if(error){toast('Già esiste o errore: '+error.message,'err');return;}
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
function adminImpostazioni(){
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
    'percentuale_provvigione','sconto_base_pct','sconto_max_pct'];
  if(numericFields.includes(campo)){
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
</script>


</html>

  if(error){toast('Errore: '+error.message,'err');return;}
  toast('Utente aggiunto con ruolo '+RUOLI_LABEL[ruolo],'ok');
  renderUtentiInline();
}

</script>

<!-- MODAL CONFIGURATORE PORTA -->
<div class="form-overlay" id="modal-cfg" style="background:rgba(0,0,0,0.75)">
  <div class="form-modal" style="width:min(820px,100%);max-height:90vh;display:flex;flex-direction:column">
    <div class="form-modal-head">
      <div style="display:flex;flex-direction:column;gap:6px;flex:1">
        <span class="form-modal-title">Configuratore porta</span>
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
          <label>Sconto 1 (%)</label>
          <input type="number" id="ndoc-sconto1" value="0" min="0" max="100" step="0.5" oninput="aggiornaTotaleNdoc()">
        </div>
        <div class="form-field">
          <label>Sconto 2 (%) — doppio sconto</label>
          <input type="number" id="ndoc-sconto2" value="0" min="0" max="100" step="0.5" oninput="aggiornaTotaleNdoc()">
        </div>
      </div>
      <!-- Destinazione merce -->
      <div style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;color:var(--mid);margin-bottom:8px">Destinazione merce</div>
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:10px;margin-bottom:16px">
        <div class="form-field"><label>Indirizzo</label><input type="text" id="ndoc-ind" placeholder="Via/Piazza..."></div>
        <div class="form-field"><label>CAP</label><input type="text" id="ndoc-cap" maxlength="5"></div>
        <div class="form-field"><label>Città</label><input type="text" id="ndoc-cit"></div>
        <div class="form-field"><label>Prov.</label><input type="text" id="ndoc-prv" maxlength="2" style="text-transform:uppercase"></div>
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
<div class="form-overlay" id="modal-cfg" style="background:rgba(0,0,0,0.75)">
  <div class="form-modal" style="width:min(820px,100%);max-height:90vh;display:flex;flex-direction:column">
    <div class="form-modal-head">
      <div style="display:flex;flex-direction:column;gap:6px;flex:1">
        <span class="form-modal-title">Configuratore porta</span>
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
  </div>
</div>


<script>
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
</script>
</body>
</html>
`;
http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store'});res.end(HTML);}).listen(PORT,()=>console.log('OK '+PORT));
