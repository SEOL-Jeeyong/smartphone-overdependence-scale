/**
 * 스마트폰 과의존 척도 (S-척도) 체크리스트 애플리케이션
 * 데이터 출처: docs/프롬프트.txt 및 과기정통부·NIA 과의존 예방 가이드라인
 */

// 척도 데이터 정의
const SCALE_DATA = {
  // 1) 관찰자용 척도 (9문항, 36점 만점, 1~3번 역채점)
  observer: {
    id: "observer",
    title: "관찰자용 척도",
    subtitle: "부모 또는 양육자가 아이의 스마트폰 이용 행동을 관찰하여 응답",
    instruction: "각 문항을 읽고 자녀(또는 대상자)에게 해당하는 칸을 체크해 주세요.",
    itemCount: 9,
    maxScore: 36,
    subtypes: {
      toddler: {
        id: "toddler",
        name: "유아 (만 3~5세)",
        badgeText: "유아 보호자용 문서 기준",
        criteria: {
          highRisk: { min: 28, label: "고위험군" },
          potential: { min: 24, max: 27, label: "잠재적 위험군" },
          normal: { max: 23, label: "일반 사용자군" }
        }
      },
      child: {
        id: "child",
        name: "유·아동 (만 3~9세)",
        badgeText: "통합 문서 표기 기준",
        criteria: {
          highRisk: { min: 28, label: "고위험군" },
          potential: { min: 24, max: 27, label: "잠재적 위험군" },
          normal: { max: 23, label: "일반 사용자군" }
        }
      }
    },
    defaultSubtype: "toddler",
    factors: [
      { id: 1, name: "조절실패", nameEn: "Out of control", items: [1, 2, 3] },
      { id: 2, name: "현저성", nameEn: "Salience", items: [4, 5, 6] },
      { id: 3, name: "문제적 결과", nameEn: "Serious consequences", items: [7, 8, 9] }
    ],
    scoringMatrix: {
      1: [4, 3, 2, 1], // 역채점 (1번 선택 -> 4점, 2번 -> 3점, 3번 -> 2점, 4번 -> 1점)
      2: [4, 3, 2, 1], // 역채점
      3: [4, 3, 2, 1], // 역채점
      4: [1, 2, 3, 4],
      5: [1, 2, 3, 4],
      6: [1, 2, 3, 4],
      7: [1, 2, 3, 4],
      8: [1, 2, 3, 4],
      9: [1, 2, 3, 4]
    },
    questions: [
      { id: 1, factorId: 1, factor: "조절실패", text: "스마트폰 이용에 대한 부모의 지도를 잘 따른다.", isReversed: true },
      { id: 2, factorId: 1, factor: "조절실패", text: "정해진 이용 시간에 맞춰 스마트폰 이용을 잘 마무리 한다.", isReversed: true },
      { id: 3, factorId: 1, factor: "조절실패", text: "이용 중인 스마트폰을 빼앗지 않아도 스스로 그만둔다.", isReversed: true },
      { id: 4, factorId: 2, factor: "현저성", text: "항상 스마트폰을 가지고 놀고 싶어 한다.", isReversed: false },
      { id: 5, factorId: 2, factor: "현저성", text: "다른 어떤 것보다 스마트폰을 갖고 노는 것을 좋아한다.", isReversed: false },
      { id: 6, factorId: 2, factor: "현저성", text: "하루에도 수시로 스마트폰을 이용하려 한다.", isReversed: false },
      { id: 7, factorId: 3, factor: "문제적 결과", text: "스마트폰 이용 때문에 아이와 자주 싸운다.", isReversed: false },
      { id: 8, factorId: 3, factor: "문제적 결과", text: "스마트폰을 하느라 다른 놀이나 학습에 지장이 있다.", isReversed: false },
      { id: 9, factorId: 3, factor: "문제적 결과", text: "스마트폰 이용으로 인해 시력이나 자세가 안 좋아진다.", isReversed: false }
    ],
    interpretations: {
      highRisk: "스마트폰 과의존 경향성이 매우 높으므로 관련 기관(스마트쉼센터 등)의 전문적 지원과 도움이 필요합니다.",
      potential: "아이의 스마트폰 사용 행동을 적절히 조절하지 않을 경우, 스마트폰에 과의존될 위험성이 있습니다. 아이의 스마트폰 사용을 관리하고 계획적으로 사용할 수 있도록 도와주세요.",
      normal: "스마트폰을 적절히 이용하고 있지만, 앞으로도 지속적인 관심과 지도가 필요합니다."
    }
  },

  // 2) 자기점검용 척도 (10문항, 40점 만점)
  self: {
    id: "self",
    title: "자기점검용 척도",
    subtitle: "평소 자신의 스마트폰 이용 습관을 솔직하게 스스로 점검",
    instruction: "각 문항을 읽고 자신에게 해당하는 칸을 체크해 주세요.",
    itemCount: 10,
    maxScore: 40,
    subtypes: {
      youth: {
        id: "youth",
        name: "청소년 (만 10~19세)",
        badgeText: "청소년용 문서 기준",
        criteria: {
          highRisk: { min: 31, label: "고위험군" },
          potential: { min: 23, max: 30, label: "잠재적 위험군" },
          normal: { max: 22, label: "일반 사용자군" }
        }
      },
      adult: {
        id: "adult",
        name: "성인 (만 20~59세)",
        badgeText: "성인용 문서 기준",
        criteria: {
          highRisk: { min: 29, label: "고위험군" },
          potential: { min: 24, max: 28, label: "잠재적 위험군" },
          normal: { max: 23, label: "일반 사용자군" }
        }
      },
      parent: {
        id: "parent",
        name: "보호자 (만 20~59세)",
        badgeText: "영아·유아 보호자용 문서 기준",
        criteria: {
          highRisk: { min: 29, label: "고위험군" },
          potential: { min: 24, max: 28, label: "잠재적 위험군" },
          normal: { max: 23, label: "일반 사용자군" }
        }
      },
      senior: {
        id: "senior",
        name: "고령층 (만 60세 이상)",
        badgeText: "고령층용 문서 기준",
        criteria: {
          highRisk: { min: 28, label: "고위험군" },
          potential: { min: 24, max: 27, label: "잠재적 위험군" },
          normal: { max: 23, label: "일반 사용자군" }
        }
      }
    },
    defaultSubtype: "youth",
    factors: [
      { id: 1, name: "조절실패", nameEn: "Out of control", items: [1, 2, 3] },
      { id: 2, name: "현저성", nameEn: "Salience", items: [4, 5, 6] },
      { id: 3, name: "문제적 결과", nameEn: "Serious consequences", items: [7, 8, 9, 10] }
    ],
    scoringMatrix: {
      1: [1, 2, 3, 4],
      2: [1, 2, 3, 4],
      3: [1, 2, 3, 4],
      4: [1, 2, 3, 4],
      5: [1, 2, 3, 4],
      6: [1, 2, 3, 4],
      7: [1, 2, 3, 4],
      8: [1, 2, 3, 4],
      9: [1, 2, 3, 4],
      10: [1, 2, 3, 4]
    },
    questions: [
      { id: 1, factorId: 1, factor: "조절실패", text: "스마트폰 이용시간을 줄이려 할 때마다 실패한다.", isReversed: false },
      { id: 2, factorId: 1, factor: "조절실패", text: "스마트폰 이용시간을 조절하는 것이 어렵다.", isReversed: false },
      { id: 3, factorId: 1, factor: "조절실패", text: "적절한 스마트폰 이용시간을 지키는 것이 어렵다.", isReversed: false },
      { id: 4, factorId: 2, factor: "현저성", text: "스마트폰이 옆에 있으면 다른 일에 집중하기 어렵다.", isReversed: false },
      { id: 5, factorId: 2, factor: "현저성", text: "스마트폰 생각이 머리에서 떠나지 않는다.", isReversed: false },
      { id: 6, factorId: 2, factor: "현저성", text: "스마트폰을 이용하고 싶은 충동을 강하게 느낀다.", isReversed: false },
      { id: 7, factorId: 3, factor: "문제적 결과", text: "스마트폰 이용 때문에 건강에 문제가 생긴 적이 있다.", isReversed: false },
      { id: 8, factorId: 3, factor: "문제적 결과", text: "스마트폰 이용 때문에 가족과 심하게 다툰 적이 있다.", isReversed: false },
      { id: 9, factorId: 3, factor: "문제적 결과", text: "스마트폰 이용 때문에 친구 혹은 동료, 사회적 관계에서 심한 갈등을 경험한 적이 있다.", isReversed: false },
      { id: 10, factorId: 3, factor: "문제적 결과", text: "스마트폰 때문에 업무(학업 혹은 직업 등) 수행에 어려움이 있다.", isReversed: false }
    ],
    interpretations: {
      highRisk: "스마트폰 과의존 경향성이 매우 높으므로 관련 기관(스마트쉼센터 1599-0075 등)의 전문적 지원과 도움이 필요합니다.",
      potential: "스마트폰 과의존에 대한 주의가 필요합니다. 스마트폰 과의존의 위험성을 깨닫고 스스로 조절하고 계획적인 사용을 하도록 노력해야 합니다.",
      normal: "스마트폰을 적절히 이용하고 있지만, 앞으로도 지속적인 자기 점검이 필요합니다."
    }
  }
};

// 애플리케이션 상태
const state = {
  currentType: "self", // 'self' | 'observer'
  currentSubtype: "youth", // 'youth' | 'adult' | 'parent' | 'senior' | 'toddler' | 'child'
  answers: {} // { [questionId]: 1~4 }
};

document.addEventListener("DOMContentLoaded", () => {
  initEvents();
  renderAll();
});

// 이벤트 바인딩
function initEvents() {
  // 척도 대분류 탭 (자기점검용 vs 관찰자용)
  const typeBtns = document.querySelectorAll(".type-tab-btn");
  typeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-type");
      if (state.currentType === type) return;

      state.currentType = type;
      state.currentSubtype = SCALE_DATA[type].defaultSubtype;
      state.answers = {}; // 척도 전환 시 답변 초기화

      typeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      renderAll();
    });
  });

  // 초기화 버튼
  document.getElementById("btn-reset")?.addEventListener("click", () => {
    if (confirm("체크리스트의 모든 응답을 초기화하시겠습니까?")) {
      state.answers = {};
      renderTable();
      renderResult();
    }
  });

  // 인쇄 버튼
  document.getElementById("btn-print")?.addEventListener("click", () => {
    window.print();
  });
}

// 전체 렌더링
function renderAll() {
  renderTipText();
  renderSubtargets();
  renderCriteriaBanner();
  renderTable();
  renderResult();
}

// 척도 유형별 문항 체크 안내 문구 렌더링
function renderTipText() {
  const tipEl = document.getElementById("checklist-tip-text");
  if (!tipEl) return;

  const typeConfig = SCALE_DATA[state.currentType];
  const instruction = typeConfig?.instruction || "각 문항을 읽고 해당하는 칸을 체크해 주세요.";
  tipEl.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${instruction}`;
}

// 세부 대상 선택 버튼 렌더링
function renderSubtargets() {
  const container = document.getElementById("sub-target-group");
  if (!container) return;

  const typeConfig = SCALE_DATA[state.currentType];
  const subtypes = Object.values(typeConfig.subtypes);

  let html = "";
  subtypes.forEach(st => {
    const isActive = state.currentSubtype === st.id;
    html += `
      <button type="button" class="sub-target-pill ${isActive ? "active" : ""}" data-subtype="${st.id}">
        <span class="st-name">${st.name}</span>
        <span class="st-desc">${st.badgeText}</span>
      </button>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll(".sub-target-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      const subtypeId = btn.getAttribute("data-subtype");
      if (state.currentSubtype === subtypeId) return;

      state.currentSubtype = subtypeId;
      container.querySelectorAll(".sub-target-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      renderCriteriaBanner();
      renderResult(); // 대상 컷오프 변경에 따른 결과 즉각 갱신
    });
  });
}

// 기준 점수 안내 바 렌더링
function renderCriteriaBanner() {
  const banner = document.getElementById("criteria-banner");
  if (!banner) return;

  const typeConfig = SCALE_DATA[state.currentType];
  const subtype = typeConfig.subtypes[state.currentSubtype];
  const crit = subtype.criteria;

  let normalText = `${crit.normal.max}점 이하`;
  let potText = `${crit.potential.min}~${crit.potential.max}점`;
  let highText = `${crit.highRisk.min}점 이상`;

  banner.innerHTML = `
    <div class="banner-title">
      <i class="fa-solid fa-circle-check text-primary"></i>
      <strong>[${subtype.name}] 판별 기준 점수 (총점 최고 ${typeConfig.maxScore}점)</strong>
    </div>
    <div class="banner-criteria-badges">
      <span class="crit-badge normal">일반 사용자군: ${normalText}</span>
      <span class="crit-badge potential">잠재적 위험군: ${potText}</span>
      <span class="crit-badge high">고위험군: ${highText}</span>
    </div>
  `;
}

// 문항별 점수 계산
function getItemScore(q, rawAnswer) {
  if (!rawAnswer) return 0;
  const matrix = SCALE_DATA[state.currentType].scoringMatrix[q.id];
  return matrix ? matrix[rawAnswer - 1] : 0;
}

// 체크리스트 테이블 렌더링
function renderTable() {
  const tbody = document.getElementById("checklist-tbody");
  const tfoot = document.getElementById("checklist-tfoot");
  if (!tbody || !tfoot) return;

  const typeConfig = SCALE_DATA[state.currentType];
  const questions = typeConfig.questions;

  // 테이블 본문 렌더링
  let bodyHtml = "";
  questions.forEach(q => {
    const currentAns = state.answers[q.id] || null;
    const scoreVal = currentAns ? getItemScore(q, currentAns) : "-";

    // 요인 셀 rowspan 처리 (조절실패 3행, 현저성 3행, 문제적 결과 나머지)
    let factorTd = "";
    if (q.id === 1) {
      factorTd = `<td class="td-factor" rowspan="3"><strong>조절실패</strong><br><small>Out of control</small></td>`;
    } else if (q.id === 4) {
      factorTd = `<td class="td-factor" rowspan="3"><strong>현저성</strong><br><small>Salience</small></td>`;
    } else if (q.id === 7) {
      const remainingRows = questions.length - 6; // 3 or 4
      factorTd = `<td class="td-factor" rowspan="${remainingRows}"><strong>문제적 결과</strong><br><small>Serious consequences</small></td>`;
    }

    bodyHtml += `
      <tr class="${currentAns ? "row-answered" : ""}" data-qid="${q.id}">
        <td class="td-num">${q.id}</td>
        ${factorTd}
        <td class="td-question">
          ${q.text}
        </td>
        ${[1, 2, 3, 4].map(opt => {
          const isSelected = currentAns === opt;
          return `
            <td class="td-opt-cell ${isSelected ? "cell-selected" : ""}" data-qid="${q.id}" data-val="${opt}">
              <label class="radio-label">
                <input type="radio" name="q_${q.id}" value="${opt}" ${isSelected ? "checked" : ""}>
                <span class="custom-radio"></span>
              </label>
            </td>
          `;
        }).join("")}
        <td class="td-score-val ${currentAns ? "has-val" : ""}">
          <strong>${scoreVal}</strong>${currentAns ? "점" : ""}
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = bodyHtml;

  // 테이블 하단 요인별 소계 및 총점 렌더링
  renderTableFoot(tfoot);

  // 셀 클릭 및 라디오 체인지 이벤트
  tbody.querySelectorAll(".td-opt-cell").forEach(cell => {
    cell.addEventListener("click", (e) => {
      const qid = parseInt(cell.getAttribute("data-qid"), 10);
      const val = parseInt(cell.getAttribute("data-val"), 10);
      state.answers[qid] = val;
      renderTable();
      renderResult();
    });
  });
}

// 하단 합계 푸터 렌더링
function renderTableFoot(tfoot) {
  const typeConfig = SCALE_DATA[state.currentType];
  const questions = typeConfig.questions;

  // 요인별 점수 계산
  const f1Scores = [1, 2, 3].map(id => state.answers[id] ? getItemScore(questions[id - 1], state.answers[id]) : 0);
  const f2Scores = [4, 5, 6].map(id => state.answers[id] ? getItemScore(questions[id - 1], state.answers[id]) : 0);
  const f3Items = typeConfig.factors[2].items;
  const f3Scores = f3Items.map(id => state.answers[id] ? getItemScore(questions[id - 1], state.answers[id]) : 0);

  const f1Sum = f1Scores.reduce((a, b) => a + b, 0);
  const f2Sum = f2Scores.reduce((a, b) => a + b, 0);
  const f3Sum = f3Scores.reduce((a, b) => a + b, 0);
  const totalSum = f1Sum + f2Sum + f3Sum;

  const answeredCount = Object.keys(state.answers).length;

  tfoot.innerHTML = `
    <tr class="tfoot-factor-row">
      <td colspan="3" class="text-right"><strong>하위 요인별 점수 소계</strong></td>
      <td colspan="4" class="factor-scores-td">
        <div class="factor-scores-container">
          <div class="factor-score-item">
            <span class="f-name">조절실패:</span>
            <strong class="f-val">${f1Sum}점</strong>
          </div>
          <div class="factor-score-item">
            <span class="f-name">현저성:</span>
            <strong class="f-val">${f2Sum}점</strong>
          </div>
          <div class="factor-score-item">
            <span class="f-name">문제적 결과:</span>
            <strong class="f-val">${f3Sum}점</strong>
          </div>
        </div>
      </td>
      <td class="td-score-val subtotal"><strong>${totalSum}</strong>점</td>
    </tr>
    <tr class="tfoot-total-row">
      <td colspan="3" class="text-right"><strong>총점 (합계)</strong></td>
      <td colspan="4" class="text-center total-progress-cell">
        <span>응답 진행: <strong>${answeredCount}</strong> / ${questions.length}문항 완료</span>
      </td>
      <td class="td-score-val grand-total"><strong>${totalSum}</strong> / ${typeConfig.maxScore}점</td>
    </tr>
  `;
}

// 결과 판별 및 대시보드 렌더링
function renderResult() {
  const dashboard = document.getElementById("result-dashboard");
  if (!dashboard) return;

  const typeConfig = SCALE_DATA[state.currentType];
  const subtype = typeConfig.subtypes[state.currentSubtype];
  const crit = subtype.criteria;
  const questions = typeConfig.questions;

  // 총점 계산
  let totalScore = 0;
  let answeredCount = 0;

  questions.forEach(q => {
    const raw = state.answers[q.id];
    if (raw) {
      answeredCount++;
      totalScore += getItemScore(q, raw);
    }
  });

  const isCompleted = answeredCount === questions.length;

  // 판별 등급 결정
  let groupKey = "normal";
  if (totalScore >= crit.highRisk.min) {
    groupKey = "highRisk";
  } else if (totalScore >= crit.potential.min) {
    groupKey = "potential";
  } else {
    groupKey = "normal";
  }

  const groupInfo = crit[groupKey];
  const interpretation = typeConfig.interpretations[groupKey];

  let statusClass = "status-normal";
  let statusIcon = "fa-circle-check";
  if (groupKey === "highRisk") {
    statusClass = "status-high";
    statusIcon = "fa-triangle-exclamation";
  } else if (groupKey === "potential") {
    statusClass = "status-potential";
    statusIcon = "fa-circle-exclamation";
  }

  dashboard.innerHTML = `
    <div class="result-card ${statusClass}">
      <div class="result-header">
        <div class="status-badge">
          <i class="fa-solid ${statusIcon}"></i>
          <span>${groupInfo.label}</span>
        </div>
        <div class="result-target-label">
          <span>진단 대상: <strong>${subtype.name}</strong></span>
        </div>
      </div>

      <div class="result-body">
        <div class="score-display-box">
          <div class="score-main">
            <span class="num">${totalScore}</span>
            <span class="max">/ ${typeConfig.maxScore}점</span>
          </div>
          <div class="score-sub">
            ${isCompleted ? `<span class="tag-done"><i class="fa-solid fa-check"></i> 모든 문항 응답 완료</span>` : `<span class="tag-ing"><i class="fa-solid fa-pen"></i> ${answeredCount} / ${questions.length}문항 응답 중</span>`}
          </div>
        </div>

        <div class="interpretation-box">
          <h4><i class="fa-solid fa-comment-medical"></i> 판정 결과 해석 및 안내</h4>
          <p class="desc">${interpretation}</p>
          <div class="criteria-reference">
            <span>[${subtype.name} 기준: 고위험군 ${crit.highRisk.min}점 이상 | 잠재적 위험군 ${crit.potential.min}~${crit.potential.max}점 | 일반 ${crit.normal.max}점 이하]</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
