import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Hidden,
} from "@material-ui/core";
import { Fade, AttentionSeeker } from "react-awesome-reveal";
import React from "react";
import { examList } from "./data";
import { BsChevronDown } from "react-icons/bs";

const FileDetails = () => {
  return (
    <div className="subject" id="subject">
      <div className="subject_container">
        <div className="subject_accordion">
          <div className="subject_accordion-heading">
            <Fade triggerOnce>
              <div className="subject_accordion-heading-heading">
                PSNA Lab-Exam 🤝{" "}
              </div>
              <div className="subject_accordion-heading-content">
                Study Materials
              </div>
            </Fade>
          </div>

          {examList.map((exams) => (
            <div
              key={exams.subjectName}
              className="subject_accordion-container"
            >
              <div className="subject_accordion-heading">
                <Fade triggerOnce>
                  <div
                    className="subject_accordion-heading-subheading"
                    id={exams.subjectName}
                  >
                    {exams.subjectName}
                  </div>
                </Fade>
              </div>
              {exams.list.map((accordionDetail, index) => (
                <div
                  className="subject_accordion-content"
                  key={accordionDetail.title}
                >
                  <Hidden mdDown>
                    <Fade
                      triggerOnce
                      direction={(index + 1) % 2 == 0 ? "left" : "right"}
                    >
                      <div className={`subject_accordion-content-${index + 1}`}>
                        <Accordion className="subject_accordion-content-card">
                          <AccordionSummary
                            expandIcon={
                              <BsChevronDown fontSize={35} color="white" />
                            }
                            aria-controls={`panel${index + 1}a-content`}
                            id={`panel${index + 1}a-header`}
                          >
                            <div className="subject_accordion-content-card-heading">
                              {accordionDetail.title}
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="subject_accordion-content-card-content">
                              <ol>
                                {accordionDetail.questions.map((question) => (
                                  <li key={question}>{question}</li>
                                ))}
                              </ol>
                            </div>
                          </AccordionDetails>
                          <AccordionActions>
                            <Button
                              variant="contained"
                              color="secondary"
                              target="_blank"
                              href={accordionDetail.fileUrl}
                            >
                              View / Download
                            </Button>
                          </AccordionActions>
                        </Accordion>
                      </div>
                    </Fade>
                  </Hidden>
                  <Hidden lgUp>
                    <AttentionSeeker effect="pulse" cascade triggerOnce>
                      <div className={`subject_accordion-content-${index + 1}`}>
                        <Accordion className="subject_accordion-content-card">
                          <AccordionSummary
                            expandIcon={
                              <BsChevronDown fontSize={35} color="white" />
                            }
                            aria-controls={`panel${index + 1}a-content`}
                            id={`panel${index + 1}a-header`}
                          >
                            <div className="subject_accordion-content-card-heading">
                              {accordionDetail.title}
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="subject_accordion-content-card-content">
                              <ol>
                                {accordionDetail.questions.map((question) => (
                                  <li key={question}>{question}</li>
                                ))}
                              </ol>
                            </div>
                          </AccordionDetails>
                          <AccordionActions>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="large"
                              target="_blank"
                              href={accordionDetail.fileUrl}
                            >
                              View / Download
                            </Button>
                          </AccordionActions>
                        </Accordion>
                      </div>
                    </AttentionSeeker>
                  </Hidden>
                </div>
              ))}
            </div>
          ))}

          <div
            className="subject_accordion-heading-content"
            style={{ marginTop: "4rem", marginBottom: "4rem" }}
          >
            Disclaimer : Materials provided only for study and education purpose
            😂, if you have any quires or want to add you subject material send
            details in below form.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;
