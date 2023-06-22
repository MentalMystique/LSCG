import { getModule } from "modules";
import { BoopsModule } from "Modules/boops";
import { LipstickModule } from "Modules/lipstick";
import { MiscModule } from "Modules/misc";
import { ICONS } from "utils";
import { GlobalSettingsModel } from "./Models/base";
import { GuiSubscreen, Setting } from "./settingBase";

export class GuiGlobal extends GuiSubscreen {

	get name(): string {
		return "General";
	}

	get icon(): string {
		return ICONS.BDSM;
	}

	get settings(): GlobalSettingsModel {
        return super.settings as GlobalSettingsModel;
    }

	get structure(): Setting[] {
		return [
			<Setting>{
				type: "checkbox",
				label: "LSCG Scripts Enabled:",
				description: "Enable LSCG Features.",
				setting: () => this.settings.enabled ?? false,
				setSetting: (val) => this.settings.enabled = val
			},<Setting>{
				type: "checkbox",
				label: "Blur While Edged:",
				description: "Apply extra blurring to the screen while edging.",
				setting: () => this.settings.edgeBlur ?? false,
				setSetting: (val) => this.settings.edgeBlur = val
			},<Setting>{
				type: "checkbox",
				label: "Enable Lipstick Marks:",
				description: "Apply kiss marks when lipstick-wearing people kiss you on the cheek/forehead/neck.",
				setting: () => Player.LSCG.LipstickModule.enabled ?? false,
				setSetting: (val) => Player.LSCG.LipstickModule.enabled = val
			},<Setting>{
				type: "checkbox",
				label: "Enable Boop Reactions:",
				description: "Auto-react when booped.",
				setting: () => Player.LSCG.BoopsModule.enabled ?? false,
				setSetting: (val) => Player.LSCG.BoopsModule.enabled = val
			},<Setting>{
				type: "checkbox",
				label: "Show Check Rolls:",
				description: "If enabled, will display the attacker/defender roll values for activity checks.",
				setting: () => this.settings.showCheckRolls ?? true,
				setSetting: (val) => this.settings.showCheckRolls = val
			}
		]
	}

	Load(): void {
		// Load up module settings to ensure defaults..
		getModule<MiscModule>("MiscModule")?.settings;
		getModule<LipstickModule>("LipstickModule")?.settings;
		getModule<BoopsModule>("BoopsModule")?.settings;
		super.Load();
	}
}