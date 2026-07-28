/* ==========================================================================
   BAYCHA Web App JavaScript Interactions & Functionality (BAYCHA DEVTEAM)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderInteractions();
  initBaychaAppSimulator();
  initDubberAppSimulator();
  initSearchFunctionality();
  initKeyboardListeners();
});

/* --- Product Showcase Switcher (Downloader vs Dubber) --- */
function switchProductShowcase(target) {
  const downloaderFrame = document.getElementById('showcaseDownloader');
  const dubberFrame = document.getElementById('showcaseDubber');
  const btnDownloader = document.getElementById('btnShowDownloader');
  const btnDubber = document.getElementById('btnShowDubber');

  if (target === 'dubber') {
    if (downloaderFrame) downloaderFrame.classList.add('hidden-showcase');
    if (dubberFrame) dubberFrame.classList.remove('hidden-showcase');
    if (btnDownloader) btnDownloader.classList.remove('active');
    if (btnDubber) btnDubber.classList.add('active');
    showToast('Switched showcase: BAYCHA-AI Translator & Dubber V1.0.0');
  } else {
    if (dubberFrame) dubberFrame.classList.add('hidden-showcase');
    if (downloaderFrame) downloaderFrame.classList.remove('hidden-showcase');
    if (btnDubber) btnDubber.classList.remove('active');
    if (btnDownloader) btnDownloader.classList.add('active');
    showToast('Switched showcase: Baycha · Social Media Downloader');
  }
}

/* --- Header & Mobile Menu --- */
function initHeaderInteractions() {
  const mobileToggleBtn = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggleBtn && mainNav) {
    mobileToggleBtn.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-active');
      const icon = mobileToggleBtn.querySelector('i');
      if (mainNav.classList.contains('mobile-active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Header scroll shadow effect
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
      siteHeader.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    }
  });
}

/* --- Authentic Baycha Social Media Downloader App Simulator --- */
function initBaychaAppSimulator() {
  const platformConfig = {
    pinterest: {
      title: "Download Pinterest Images & Boards",
      subtitle: "Download high resolution photos & pins from profiles",
      placeholder: "@Username · pin URL · board link",
      folder: "Pinterest / username"
    },
    instagram: {
      title: "Download Instagram Videos",
      subtitle: "Download videos & reels from profiles",
      placeholder: "@Username · profile URL · /reel/ link",
      folder: "Instagram / username"
    },
    youtube: {
      title: "Download YouTube Videos & Shorts",
      subtitle: "Download high quality videos, shorts & playlists",
      placeholder: "@ChannelHandle · playlist URL · /shorts/ link",
      folder: "YouTube / channel"
    },
    tiktok: {
      title: "Download TikTok Videos Without Watermark",
      subtitle: "Download HD videos, feeds & user profiles",
      placeholder: "@TikTokUser · video URL · profile link",
      folder: "TikTok / username"
    },
    facebook: {
      title: "Download Facebook Videos & Reels",
      subtitle: "Extract HD public videos, pages & reels",
      placeholder: "Facebook page URL · watch link · reel URL",
      folder: "Facebook / page"
    },
    rednote: {
      title: "Download Rednote Content",
      subtitle: "Download HD photos, videos & notes from Rednote",
      placeholder: "Rednote user ID · note share link",
      folder: "Rednote / user"
    },
    xiaohongshu: {
      title: "Download Xiaohongshu (RED) Media",
      subtitle: "Bulk extract Xiaohongshu posts & videos",
      placeholder: "Xiaohongshu user URL · post link",
      folder: "Xiaohongshu / user"
    },
    kwai: {
      title: "Download Kwai Short Videos",
      subtitle: "Download high speed Kwai feeds & creator clips",
      placeholder: "Kwai profile link · video share link",
      folder: "Kwai / profile"
    },
    snackvideo: {
      title: "Download SnackVideo Media",
      subtitle: "Extract HD SnackVideo clips & creator profiles",
      placeholder: "SnackVideo user link · post URL",
      folder: "SnackVideo / profile"
    },
    reelshort: {
      title: "Download Drama ReelShort Series",
      subtitle: "Bulk download episode playlists & full short dramas",
      placeholder: "ReelShort drama link · episode series URL",
      folder: "ReelShort / drama_name"
    },
    shorttv: {
      title: "Download Drama ShortTV Series",
      subtitle: "Extract full HD ShortTV drama episodes",
      placeholder: "ShortTV drama playlist link · episode URL",
      folder: "ShortTV / drama_name"
    },

    extension: {
      title: "Chrome Extension Scraper",
      subtitle: "Import custom scraped video & photo links from browser extension",
      placeholder: "Paste extension scraped links batch...",
      folder: "Extension / custom_batch"
    },
    settings: {
      title: "Software Configuration & Settings",
      subtitle: "Manage download directories, cookies & GPU acceleration",
      placeholder: "Configure options below...",
      folder: "Settings / System"
    },
    license: {
      title: "BAYCHA License & Customer Support",
      subtitle: "View active license details & contact support",
      placeholder: "Enter license activation key...",
      folder: "License / Key"
    },
    logs: {
      title: "Real-time System Logs",
      subtitle: "Inspect scraper execution logs & error tracebacks",
      placeholder: "Filter log messages...",
      folder: "Logs / Trace"
    }
  };

  // Platform Sidebar Navigation Switcher
  const navLinks = document.querySelectorAll('.baycha-nav-link');
  const titleEl = document.getElementById('appPlatformTitle');
  const subtitleEl = document.getElementById('appPlatformSubtitle');
  const urlInput = document.getElementById('baychaUrlInput');
  const folderText = document.getElementById('saveFolderText');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const pKey = link.getAttribute('data-platform');
      if (pKey === 'license') {
        openMachineLicenseModal('BAYCHA License Activation', '$10');
      }

      const conf = platformConfig[pKey];

      if (conf) {
        if (titleEl) titleEl.innerText = conf.title;
        if (subtitleEl) subtitleEl.innerText = conf.subtitle;
        if (urlInput) urlInput.placeholder = conf.placeholder;
        if (folderText) folderText.innerText = conf.folder;

        showToast(`Switched platform: ${link.querySelector('span').innerText}`);
      }
    });
  });

  // Add to Queue Button
  const addQueueBtn = document.getElementById('baychaAddQueueBtn');
  const queueBox = document.getElementById('baychaQueueBox');
  const queueCountText = document.getElementById('queueCountText');

  if (addQueueBtn && queueBox) {
    addQueueBtn.addEventListener('click', () => {
      const val = urlInput ? urlInput.value.trim() : '';
      if (!val) {
        showToast('Please enter a valid profile or media link.');
        return;
      }

      const activeLink = document.querySelector('.baycha-nav-link.active span');
      const tagText = activeLink ? activeLink.innerText.toUpperCase() : 'MEDIA';

      const newRow = document.createElement('div');
      newRow.className = 'queue-item-row';
      newRow.style.marginTop = '6px';
      newRow.innerHTML = `
        <div class="queue-item-left">
          <span class="queue-item-badge">${tagText}</span>
          <span class="queue-item-title">${val}</span>
        </div>
        <span class="queue-item-status ready">Ready to download</span>
      `;

      queueBox.appendChild(newRow);
      const count = queueBox.children.length;
      if (queueCountText) queueCountText.innerText = `${count} items`;

      showToast('Item added to queue!');
    });
  }

  // Clear All Queue Items
  const clearAllQueueBtn = document.getElementById('clearAllQueueBtn');
  if (clearAllQueueBtn && queueBox) {
    clearAllQueueBtn.addEventListener('click', () => {
      queueBox.innerHTML = '';
      if (queueCountText) queueCountText.innerText = '0 items';
      showToast('Queue cleared.');
    });
  }

  // Start Download Simulation
  const startBtn = document.getElementById('baychaStartBtn');
  const stopBtn = document.getElementById('baychaStopBtn');
  const controlStatusText = document.getElementById('controlStatusText');
  const progressFill = document.getElementById('baychaProgressFill');
  const statSuccess = document.getElementById('statSuccess');
  const statDownloaded = document.getElementById('statDownloaded');
  const statFailed = document.getElementById('statFailed');
  const statCurrent = document.getElementById('statCurrent');

  let downloadInterval = null;

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (downloadInterval) clearInterval(downloadInterval);

      if (controlStatusText) controlStatusText.innerText = 'Downloading profile videos & reels...';
      if (statCurrent) statCurrent.innerText = 'Extracting index...';

      let progress = 0;
      let downloadedCount = 0;

      downloadInterval = setInterval(() => {
        progress += 15;
        downloadedCount += Math.floor(Math.random() * 3) + 1;

        if (progressFill) progressFill.style.width = `${progress}%`;
        if (statDownloaded) statDownloaded.innerText = downloadedCount;
        if (statSuccess) statSuccess.innerText = `${downloadedCount} items`;
        if (statCurrent) statCurrent.innerText = `File #${downloadedCount}_HD.mp4`;

        if (progress >= 100) {
          clearInterval(downloadInterval);
          if (progressFill) progressFill.style.width = '100%';
          if (controlStatusText) controlStatusText.innerText = 'Download Completed Successfully!';
          if (statCurrent) statCurrent.innerText = 'Finished';
          showToast('Batch download finished successfully!');
        }
      }, 500);
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      if (downloadInterval) clearInterval(downloadInterval);
      if (controlStatusText) controlStatusText.innerText = 'Download Stopped.';
      if (statCurrent) statCurrent.innerText = 'Stopped';
      showToast('Download task stopped.');
    });
  }
}

/* --- Authentic BAYCHA-AI Translator & Dubber App Simulator --- */
function initDubberAppSimulator() {
  const modeTabs = document.querySelectorAll('.dub-mode-tab');
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showToast(`Dubber mode switched to: ${tab.innerText.trim()}`);
    });
  });

  const btnStartAll = document.getElementById('btnDubberStartAll');
  if (btnStartAll) {
    btnStartAll.addEventListener('click', () => {
      showToast('BAYCHA-AI Auto Transcribe & Khmer TTS Dubbing Started...');
      
      const rows = document.querySelectorAll('.dubber-activities-table tbody tr');
      let index = 0;
      const interval = setInterval(() => {
        if (index < rows.length) {
          rows[index].classList.add('active-dubbing-row');
          const statusPill = rows[index].querySelector('.status-pill');
          if (statusPill) {
            statusPill.innerText = 'Dubbing...';
            statusPill.style.backgroundColor = '#fff3cd';
            statusPill.style.color = '#856404';
          }
          setTimeout(() => {
            if (statusPill) {
              statusPill.innerText = 'Synthesized';
              statusPill.style.backgroundColor = '#e3f2fd';
              statusPill.style.color = '#0288d1';
            }
          }, 800);
          index++;
        } else {
          clearInterval(interval);
          showToast('AI Dubbing & Khmer TTS Voice Generation Completed!');
        }
      }, 600);
    });
  }

  const btnDubPlay = document.getElementById('btnDubPlay');
  if (btnDubPlay) {
    btnDubPlay.addEventListener('click', () => {
      const icon = btnDubPlay.querySelector('i');
      if (icon.classList.contains('fa-play')) {
        icon.className = 'fa-solid fa-pause';
        showToast('Playing Dubbing Video Preview with Khmer AI Voice');
      } else {
        icon.className = 'fa-solid fa-play';
        showToast('Paused Video Preview');
      }
    });
  }
}

/* --- Machine ID & License LineEdit Modal Logic --- */
let selectedPlanGlobal = { name: '1 Month', price: '$10' };

function selectPlan(planName, price) {
  selectedPlanGlobal = { name: planName, price: price };
  closePricingModal();
  openMachineLicenseModal(planName, price);
}

function openMachineLicenseModal(planName, price) {
  const modal = document.getElementById('machineLicenseModal');
  const title = document.getElementById('machineModalPlanTitle');
  const priceTag = document.getElementById('machineModalPlanPrice');
  
  if (title) title.innerText = `License Key Purchase & Machine Activation`;
  if (priceTag) priceTag.innerText = `Selected Plan: ${planName} (${price})`;

  if (modal) modal.classList.add('active');
}

function closeMachineLicenseModal() {
  const modal = document.getElementById('machineLicenseModal');
  if (modal) modal.classList.remove('active');
}

function copyMachineIdLineEdit() {
  const lineEdit = document.getElementById('machineIdLineEdit');
  const text = lineEdit ? lineEdit.value : '04AA9B823C20DCA6';
  
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Machine ID "${text}" copied to clipboard!`);
  }).catch(() => {
    showToast(`Machine ID: ${text}`);
  });
}

function proceedToBakongKHQRModal() {
  const lineEdit = document.getElementById('machineIdLineEdit');
  const machineId = lineEdit ? lineEdit.value.trim() : '04AA9B823C20DCA6';
  
  if (!machineId) {
    showToast('Please enter a valid Machine ID.');
    return;
  }

  closeMachineLicenseModal();
  openBakongKhqrModal(selectedPlanGlobal.price);
}

/* --- Bakong KHQR QR Code Payment Modal --- */
function openBakongKhqrModal(price) {
  const modal = document.getElementById('bakongKhqrModal');
  const displayPrice = document.getElementById('khqrDisplayPrice');
  const statusMsg = document.getElementById('khqrStatusMessage');

  if (displayPrice) displayPrice.innerText = `${price} USD`;
  if (statusMsg) statusMsg.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Polling Bakong Open API status with Bearer token...';

  if (modal) modal.classList.add('active');
  showToast('Bakong KHQR generated successfully! Scan with ABA or Bakong app.');
}

function closeBakongKhqrModal() {
  const modal = document.getElementById('bakongKhqrModal');
  if (modal) modal.classList.remove('active');
}

function confirmBakongPaymentSuccess() {
  closeBakongKhqrModal();
  showToast('✔ Bakong KHQR Payment Verified! License saved to Database & Permanent PC storage!');

  // Update green license banner in software simulator
  const bannerText = document.querySelector('.license-banner-text');
  if (bannerText) {
    bannerText.innerHTML = `<strong>License Active (${selectedPlanGlobal.name})</strong> — BAYCHA · Activated & Saved to DB`;
  }
}

function sendMachineIdToTelegram() {
  copyMachineIdLineEdit();
  showToast('Machine ID copied! Opening Telegram Support @BAYCHATOOLS...');
  setTimeout(() => {
    window.open('https://t.me/BAYCHATOOLS', '_blank');
  }, 1000);
}

/* --- Search Modal & Live Filtering --- */
function initSearchFunctionality() {
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchModal = document.getElementById('searchModal');
  const searchInputField = document.getElementById('searchInputField');
  const searchResultsContainer = document.getElementById('searchResultsContainer');

  if (searchTriggerBtn) {
    searchTriggerBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      setTimeout(() => searchInputField.focus(), 100);
    });
  }

  const siteTopics = [
    { title: "Bakong KHQR Payment & License Purchase", category: "Bakong KHQR", desc: "Purchase license with Bakong KHQR (Token: eyJhbGciOiJIUzI1Ni...) and save to SQLite DB." },
    { title: "Machine ID Activation & LineEdit License Key", category: "License", desc: "Machine ID: 04AA9B823C20DCA6 copy lineEdit and paste license activation key." },
    { title: "BAYCHA-AI Translator & Dubber V1.0.0", category: "AI Tools", desc: "Single dubbing, batch dubbing, auto transcribe, translation & synthetic TTS Khmer voice generator." },
    { title: "BAYCHA Bulk Media Downloader v1.4.07", category: "Download", desc: "Download high-speed video and photo scraper with RAR password BAYCHA2026." },
    { title: "License Pricing Plans (Trial, 1M, 3M, 6M)", category: "Pricing", desc: "$1 Trial, $10 1-Month, $20 3-Months, $33 6-Months (+40 days bonus free)." }
  ];

  if (searchInputField && searchResultsContainer) {
    searchInputField.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        searchResultsContainer.innerHTML = '<div class="search-placeholder-msg">Start typing to filter site topics and downloads.</div>';
        return;
      }

      const filtered = siteTopics.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        searchResultsContainer.innerHTML = '<div class="search-placeholder-msg">No matching topics found.</div>';
        return;
      }

      searchResultsContainer.innerHTML = filtered.map(item => `
        <div class="search-result-item" onclick="closeSearchModal()">
          <h4>[${item.category}] ${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      `).join('');
    });
  }
}

function closeSearchModal() {
  document.getElementById('searchModal').classList.remove('active');
}

/* --- Pricing & Plan Purchase Modal --- */
function openPricingModal() {
  document.getElementById('pricingModal').classList.add('active');
}

function closePricingModal() {
  document.getElementById('pricingModal').classList.remove('active');
}

/* --- Direct Download Simulator Modal --- */
function triggerDownloadDemo() {
  const downloadModal = document.getElementById('downloadModal');
  const fill = document.getElementById('downloadProgressFill');
  const text = document.getElementById('downloadProgressText');
  const fileName = document.getElementById('downloadFileName');

  if (fileName) fileName.innerText = 'BAYCHA_Installer_v1.4.07.rar';
  downloadModal.classList.add('active');
  fill.style.width = '0%';
  text.innerText = 'Connecting to high-speed CDN server...';

  let current = 0;
  const interval = setInterval(() => {
    current += 10;
    fill.style.width = `${current}%`;
    text.innerText = `Downloading installer package... ${current}%`;

    if (current >= 100) {
      clearInterval(interval);
      text.innerHTML = '<strong style="color: var(--accent-green);">Download Completed! Extraction RAR Password: BAYCHA2026</strong>';
      triggerBrowserFileSave('BAYCHA_Installer_v1.4.07.rar');
    }
  }, 250);
}

function triggerPatchDownload(version) {
  const downloadModal = document.getElementById('downloadModal');
  const fill = document.getElementById('downloadProgressFill');
  const text = document.getElementById('downloadProgressText');
  const fileName = document.getElementById('downloadFileName');

  if (fileName) fileName.innerText = `BAYCHA_Patch_${version}.rar`;
  downloadModal.classList.add('active');
  fill.style.width = '0%';
  text.innerText = `Preparing Patch Update ${version}...`;

  let current = 0;
  const interval = setInterval(() => {
    current += 20;
    fill.style.width = `${current}%`;
    text.innerText = `Downloading Patch File ${version}... ${current}%`;

    if (current >= 100) {
      clearInterval(interval);
      text.innerHTML = '<strong style="color: var(--accent-green);">Patch File Downloaded! RAR Password: BAYCHA2026</strong>';
      triggerBrowserFileSave(`BAYCHA_Patch_${version}.rar`);
    }
  }, 200);
}

function closeDownloadModal() {
  document.getElementById('downloadModal').classList.remove('active');
}

function copyRarPassword() {
  navigator.clipboard.writeText('BAYCHA2026').then(() => {
    showToast('RAR password "BAYCHA2026" copied to clipboard!');
  }).catch(() => {
    showToast('Password is: BAYCHA2026');
  });
}

function triggerBrowserFileSave(filename) {
  const dummyContent = "BAYCHA Software Installation File Archive (RAR Password: BAYCHA2026)\nBAYCHA DEVTEAM Official Release v1.4.07";
  const blob = new Blob([dummyContent], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* --- System Requirements Modal --- */
function openSysReqModal() {
  document.getElementById('sysReqModal').classList.add('active');
}

function closeSysReqModal() {
  document.getElementById('sysReqModal').classList.remove('active');
}

/* --- Video Modal Player --- */
function openLocalVideoModal(videoSrc) {
  const videoModal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const videoPlayer = document.getElementById('localVideoPlayer');

  if (iframe) {
    iframe.src = '';
    iframe.style.display = 'none';
  }
  if (videoPlayer) {
    videoPlayer.style.display = 'block';
    videoPlayer.src = videoSrc;
    videoPlayer.play().catch(() => {});
  }
  videoModal.classList.add('active');
  showToast('Playing official tutorial video...');
}

function openVideoModal(embedUrl) {
  const videoModal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const videoPlayer = document.getElementById('localVideoPlayer');

  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.src = '';
    videoPlayer.style.display = 'none';
  }
  if (iframe) {
    iframe.style.display = 'block';
    iframe.src = embedUrl;
  }
  videoModal.classList.add('active');
}

function closeVideoModal() {
  const videoModal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const videoPlayer = document.getElementById('localVideoPlayer');

  if (iframe) iframe.src = '';
  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.src = '';
  }
  videoModal.classList.remove('active');
}

/* --- Global Keyboard Listener (Escape to close modals) --- */
function initKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearchModal();
      closePricingModal();
      closeMachineLicenseModal();
      closeBakongKhqrModal();
      closeDownloadModal();
      closeSysReqModal();
      closeVideoModal();
    }
  });
}

/* --- Notification Toast Utility --- */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.zIndex = '3000';
    toast.style.backgroundColor = '#0288d1';
    toast.style.color = '#ffffff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.fontWeight = '600';
    toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
    toast.style.transition = 'all 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3000);
}
