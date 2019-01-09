import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { RulesService } from './services/rules.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  rules: any = [];
  newFunctionData = [];
  newRoleArr = [];
  newCountryArr = [];
  public function = [];
  public role = [];
  public country = [];
  public allFunctionData = [];
  public allCountryData = [];
  public allRoleData = [];

  constructor(private fb: FormBuilder, private ruleService: RulesService) { }

  ngOnInit() {
    this.getDataRules();
  }

  addRule(): void {
    this.rules.push({ruleId: this.rules.length + 1, companyFunctionModels: [], companyRoleModels: [], countryModels: []});
  }

  getDataRules() {
    this.ruleService.getRules().subscribe(response => {
      response.rules.forEach((dataRule, index) => {
        this.function = [];
        this.role = [];
        this.country = [];

        dataRule.companyFunctionModels.forEach(functionData => {
          this.function.push(functionData);
          this.allFunctionData.push(functionData);
        })

        dataRule.companyRoleModels.forEach(roleData => {
          this.role.push(roleData);
          this.allRoleData.push(roleData);
        })

        dataRule.countryModels.forEach(countryData => {
          this.country.push(countryData);
          this.allCountryData.push(countryData);
        })
        this.rules.push({ruleId: index + 1, companyFunctionModels: this.function, companyRoleModels: this.role, countryModels: this.country});
      })

      var functionUnique = {};
      var roleUnique = {};
      var countryUnique = {};
      var newFunctionData = [];
      var newRoleArr = [];
      var newCountryArr = [];

      this.allFunctionData.filter(function(item) {
          if (!functionUnique[item.id]) {
              newFunctionData.push(item);
              functionUnique[item.id] = item;
          }
      });

      this.allFunctionData = newFunctionData;

      this.allRoleData.filter(function(item) {
          if (!roleUnique[item.id]) {
              newRoleArr.push(item);
              roleUnique[item.id] = item;
          }
      });

      this.allRoleData = newRoleArr;

      this.allCountryData.filter(function(item) {
          if (!countryUnique[item.id]) {
              newCountryArr.push(item);
              countryUnique[item.id] = item;
          }
      });
      this.allCountryData = newCountryArr;
    });
  }

  onSave() {
    console.log("onSave", this.rules);
    this.ruleService.saveRules({rules: this.rules}).subscribe(response => {
      console.log("Save Success Response", response);
    });
  }
}
