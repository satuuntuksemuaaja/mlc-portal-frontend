/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import xlsx from 'json-as-xlsx';
import { Client } from 'src/app/interfaces/clients.interface';
import { AuthService } from 'src/app/services/auth.service';
import { OrgService } from 'src/app/services/org.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Organisation, OrgRepository } from 'src/app/stores/org.repository';
import { UserDetails, UserRepository } from 'src/app/stores/user.repository';

@Component({
  selector: 'mlc-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  public agents: Client[] = [];
  isLoading = false;
  agentCroppedImg: string;
  viewMode = 'organisation';
  organization: Organisation;

  customActionSheetOptions = {
    header: 'Reports'
  };

  profileImage: any = ' ';

  dropDownLabel = 'Report';
  fieldName = 'report';

  dates = {
    from: '',
    to: ''
  };

  public orgForm: FormGroup;
  private dateValue: any;
  private toDateValue: any;

  reportForm = new FormGroup({
    report: new FormControl('', [Validators.required]),
    to: new FormControl({
      value: new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-')
        .split('-')
        .reverse()
        .join('-'),
      disabled: false
    }),
    from: new FormControl({
      value: this.getToday().split('-').reverse().join('-'),
      disabled: false
    })
  });

  editedImg: any;
  prevMode: string;
  selectedAgent: any;
  showFromDate = false;
  updateImage = false;
  cancelEdit: boolean;

  userDetails: UserDetails = null;
  isAgentToggle = false;

  constructor(
    private orgRepo: OrgRepository,
    private orgService: OrgService,
    private reportService: ReportsService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private userRepo: UserRepository,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.orgService.getAllOrganisation();
    this.getOrg();

    this.userRepo.userDetails$.subscribe({
      next: (data) => {
        this.userDetails = data;
      }
    });
  }

  getToday() {
    return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  }

  async getData(event: any): Promise<void> {
    this.organization.org.name = event.name;
    this.organization.org.websiteUrl = event.website;
    this.organization.org.logoThumbnail = this.profileImage;
    this.organization.org.welcomeMessageTemplate = event.welcomeMessageTemplate;
    await this.utilityService.showLoader('Saving');
    this.orgService.updateOrganisation(this.organization).subscribe({
      next: (organisation: Organisation) => {
        this.orgRepo.updateOrgInfo(organisation);
        this.authService.getUserDetails().subscribe({
          next: (data) => {
            console.log('updated user details --- ', data);
          },
          error: console.error
        });
        this.utilityService.hideLoader();
      },
      error: (e) => {
        console.log('error --- ', e);
        this.utilityService.hideLoader();
      }
    });
  }

  getOrg() {
    this.orgRepo.org$.subscribe({
      next: (org) => {
        this.organization = { ...org };
        this.setupOrganisationForm();
        this.profileImage = this.organization.org.logoThumbnail;
      }
    });
  }

  changeMode(view: string, cancelEdit?: boolean) {
    this.prevMode = this.viewMode;
    this.viewMode = view;
    this.cancelEdit = cancelEdit;
    if (this.prevMode === 'agents') {
      this.updateImage = true;
    }
    if (
      this.prevMode === 'organisation' ||
      this.prevMode === 'clients' ||
      this.prevMode === 'reporting'
    ) {
      this.updateImage = false;
    }
  }

  setXlxsCloumn(dataKeys: { [key: string]: any }) {
    const columns: any[] = [];
    if (dataKeys === undefined) {
      return null;
    }
    Object.keys(dataKeys).forEach((columnKey) => {
      columns.push({ label: columnKey.toUpperCase(), value: columnKey });
    });
    return columns;
  }

  openAlertSuccessMessage(title: string, message: string) {
    this.utilityService.openAlert({
      title,
      message,
      type: 'success'
    });
  }

  openAlertErrorMessage(title: string, message: string) {
    this.utilityService.openAlert({
      title,
      message,
      type: 'error'
    });
  }

  getConfig(reportType: string) {
    let data: any;
    const settings = {
      fileName: ' ', // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional.
      writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
    };
    this.utilityService.showLoader('Loading');
    switch (reportType) {
      case 'agents':
        this.reportService.getAgentsReport(this.dates.from, this.dates.to).subscribe({
          next: (reportData) => {
            settings.fileName = reportType.toUpperCase();
            const column = this.setXlxsCloumn(reportData.content[0]);
            this.utilityService.hideLoader();
            if (column !== null) {
              data = [
                {
                  sheet: reportType.toUpperCase(),
                  columns: column,
                  content: reportData.content
                }
              ];
              xlsx(data, settings);
            } else {
              this.openAlertSuccessMessage('No data', 'No data for report');
            }
          },
          error: (e) => {
            console.log('error --- ', e);
            this.utilityService.hideLoader();
          }
        });
        break;
      case 'clients':
        this.reportService.getClientsReport(this.dates.from, this.dates.to).subscribe({
          next: (reportData) => {
            settings.fileName = reportType.toUpperCase();
            const column = this.setXlxsCloumn(reportData.content[0]);
            this.utilityService.hideLoader();
            if (column !== null) {
              data = [
                {
                  sheet: reportType.toUpperCase(),
                  columns: column,
                  content: reportData.content
                }
              ];
              xlsx(data, settings);
            } else {
              this.openAlertSuccessMessage('No data', 'No data for report');
            }
          },
          error: (e) => {
            console.log('error --- ', e);
            this.utilityService.hideLoader();
          }
        });
        break;
      case 'clientAgent':
        this.reportService.getClientAgents(this.dates.from, this.dates.to).subscribe({
          next: (reportData) => {
            settings.fileName = reportType.toUpperCase();
            const column = this.setXlxsCloumn(reportData.content[0]);
            this.utilityService.hideLoader();
            if (column !== null) {
              data = [
                {
                  sheet: reportType.toUpperCase(),
                  columns: column,
                  content: reportData.content
                }
              ];
              xlsx(data, settings);
            } else {
              this.openAlertSuccessMessage('No data', 'No data for report');
            }
          },
          error: (e) => {
            console.log('error --- ', e);
            this.utilityService.hideLoader();
          }
        });
        break;
      case 'auditLogs':
        this.reportService.getAuitLogs(this.dates.from, this.dates.to).subscribe({
          next: (reportData) => {
            settings.fileName = reportType.toUpperCase();
            const column = this.setXlxsCloumn(reportData.content[0]);
            this.utilityService.hideLoader();
            if (column !== null) {
              data = [
                {
                  sheet: reportType.toUpperCase(),
                  columns: column,
                  content: reportData.content
                }
              ];
              xlsx(data, settings);
            } else {
              this.openAlertSuccessMessage('No data', 'No data for report');
            }
          },
          error: (e) => {
            console.log('error --- ', e);
            this.utilityService.hideLoader();
          }
        });
        break;
      case 'clientSubscriptions':
        this.reportService.getClientSubscriptions(this.dates.from, this.dates.to).subscribe({
          next: (reportData) => {
            settings.fileName = reportType.toUpperCase();
            const column = this.setXlxsCloumn(reportData.content[0]);
            this.utilityService.hideLoader();
            if (column !== null) {
              data = [
                {
                  sheet: reportType.toUpperCase(),
                  columns: column,
                  content: reportData.content
                }
              ];
              xlsx(data, settings);
            } else {
              this.openAlertSuccessMessage('No data', 'No data for report');
            }
          },
          error: (e) => {
            console.log('error --- ', e);
            this.utilityService.hideLoader();
          }
        });
        break;
      default:
        this.utilityService.hideLoader();
        break;
    }
  }

  submitReport() {
    // const form = this.reformDate(this.reportForm.value.from);
    // const to = this.reformDate(this.reportForm.value.to);
    this.dates = { from: this.reportForm.value.from, to: this.reportForm.value.to };
    this.getConfig(this.reportForm.value.report);
  }

  clickImage() {
    this.changeMode('editedImg');
  }

  getImage(event: any) {
    // this.profileImage = event.target.files[0];
    this.editedImg = event.target.files[0];
  }

  getEditedImage(event: any) {
    if (this.prevMode === 'organisation') {
      this.isLoading = true;
      this.organization.org.thumb = event;
      this.organization.org.logoThumbnail = event;
      this.orgService.updateOrganisation(this.organization).subscribe({
        next: (organization) => {
          this.organization = organization;
          this.orgRepo.updateOrgInfo(organization);
          this.orgRepo.org$.subscribe({
            next: (org) => {
              this.profileImage = org.org.logoThumbnail;
            }
          });
        },
        error: () => {
          this.isLoading = false;
          this.openAlertSuccessMessage('Update Image Failed', 'Error Uploading Image');
        },
        complete: () => {
          this.authService.getUserProfileImage().subscribe({
            next: (data) => {
              console.log('updated user profile image --- ', data);
            },
            error: (e) => {
              console.log(e);
            }
          });
          this.changeMode('organisation');
          this.openAlertSuccessMessage('Upload Success', 'Image Updated Successfully');
          this.isLoading = false;
        }
      });
    } else if (this.prevMode === 'agents') {
      this.agentCroppedImg = event;
      this.changeMode('agents');
    }
  }

  getCurrentAgent(agent) {
    this.selectedAgent = agent;
  }

  getAgentToggleState(toggleState: boolean) {
    this.isAgentToggle = toggleState;
  }

  openDatePicker() {
    this.showFromDate = true;
  }

  get date(): any {
    return this.dateValue;
  }
  set date(value: any) {
    this.dateValue = value;
  }

  get toDate(): any {
    return this.toDateValue;
  }
  set toDate(value: any) {
    this.toDateValue = value;
  }

  getDate(event: any) {
    this.dateValue = event.detail.value;
  }

  getToDate(event: any) {
    this.toDateValue = event.detail.value;
  }

  reformDate(date: string) {
    return date.split('-').reverse().join('-');
  }

  cancelEditing() {
    this.setupOrganisationForm();
  }

  private setupOrganisationForm() {
    this.orgForm = this.formBuilder.group({
      name: [this.organization.org.name, [Validators.required]],
      website: [this.organization.org.websiteUrl, [Validators.required]],
      welcomeMessageTemplate: [this.organization.org.welcomeMessageTemplate],
      domain: [
        { value: this.organization.org.primaryDomain, disabled: true },
        [Validators.required]
      ],
      key: [{ value: this.organization.org.key, disabled: true }, Validators.required]
    });
  }
}
